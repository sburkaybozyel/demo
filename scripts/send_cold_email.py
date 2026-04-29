#!/usr/bin/env python3
"""Send Turkish EAP/wellbeing cold email campaign.

Dry-run is the default. Add --send only after SMTP env vars are configured.
"""

from __future__ import annotations

import argparse
import csv
import os
import smtplib
import ssl
import sys
import time
from datetime import datetime, timezone
from email.message import EmailMessage
from pathlib import Path


SENDABLE_STATUSES = {"public_site_contact", "public_info"}
FREE_MAIL_DOMAINS = {
    "gmail.com",
    "hotmail.com",
    "outlook.com",
    "yahoo.com",
    "icloud.com",
    "proton.me",
    "protonmail.com",
}
GENERIC_LOCAL_PARTS = {
    "bilgi",
    "contact",
    "destek",
    "hello",
    "hi",
    "info",
    "iletisim",
    "sales",
    "support",
}


def load_targets(path: Path) -> list[dict[str, str]]:
    with path.open(newline="", encoding="utf-8") as f:
        return list(csv.DictReader(f))


def load_template(path: Path) -> str:
    return path.read_text(encoding="utf-8").strip()


def is_sendable(row: dict[str, str]) -> bool:
    email = row.get("email", "").strip()
    status = row.get("email_status", "").strip()
    return bool(email) and status in SENDABLE_STATUSES and not is_personal_email(email)


def is_personal_email(email: str) -> bool:
    local, _, domain = email.lower().partition("@")
    if not local or not domain:
        return True
    if domain in FREE_MAIL_DOMAINS:
        return True
    if local in GENERIC_LOCAL_PARTS:
        return False
    if "." in local or "_" in local or "-" in local:
        return True
    return False


def build_message(
    *,
    row: dict[str, str],
    body: str,
    subject: str,
    from_email: str,
    from_name: str,
    reply_to: str | None,
) -> EmailMessage:
    msg = EmailMessage()
    msg["Subject"] = subject
    msg["From"] = f"{from_name} <{from_email}>"
    msg["To"] = row["email"].strip()
    if reply_to:
        msg["Reply-To"] = reply_to
    msg["X-Campaign"] = "turkey-eap-wellbeing-early-partner"
    msg.set_content(body)
    return msg


def smtp_client() -> smtplib.SMTP:
    host = os.environ["SMTP_HOST"]
    port = int(os.environ.get("SMTP_PORT", "587"))
    user = os.environ.get("SMTP_USER")
    password = os.environ.get("SMTP_PASS")

    client = smtplib.SMTP(host, port, timeout=30)
    client.ehlo()
    client.starttls(context=ssl.create_default_context())
    client.ehlo()
    if user and password:
        client.login(user, password)
    return client


def append_log(log_path: Path, row: dict[str, str], action: str, detail: str) -> None:
    exists = log_path.exists()
    log_path.parent.mkdir(parents=True, exist_ok=True)
    with log_path.open("a", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(
            f,
            fieldnames=[
                "timestamp",
                "company",
                "email",
                "action",
                "detail",
            ],
        )
        if not exists:
            writer.writeheader()
        writer.writerow(
            {
                "timestamp": datetime.now(timezone.utc).isoformat(),
                "company": row.get("company", ""),
                "email": row.get("email", ""),
                "action": action,
                "detail": detail,
            }
        )


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--csv",
        default="campaigns/turkey-eap-wellbeing/targets.csv",
        help="Target CSV path.",
    )
    parser.add_argument(
        "--template",
        default="outreach/turkey-eap-cold-email.txt",
        help="Plain text email body template path.",
    )
    parser.add_argument(
        "--subject",
        default="Vent Turkiye erken partnerlik modeli",
        help="Email subject.",
    )
    parser.add_argument("--from-name", default="Salih")
    parser.add_argument("--send", action="store_true", help="Actually send emails.")
    parser.add_argument("--limit", type=int, default=None)
    parser.add_argument("--sleep", type=float, default=3.0, help="Seconds between sends.")
    parser.add_argument(
        "--log",
        default="campaigns/turkey-eap-wellbeing/send-log.csv",
        help="Send log CSV path.",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    targets = [row for row in load_targets(Path(args.csv)) if is_sendable(row)]
    if args.limit is not None:
        targets = targets[: args.limit]

    body = load_template(Path(args.template))
    from_email = os.environ.get("FROM_EMAIL", "").strip()
    reply_to = os.environ.get("REPLY_TO", "").strip() or None

    if args.send and not from_email:
        print("FROM_EMAIL env var is required with --send.", file=sys.stderr)
        return 2
    if args.send and args.limit is None:
        print("--limit is required with --send.", file=sys.stderr)
        return 2

    print(f"Targets ready: {len(targets)}")
    print(f"Mode: {'SEND' if args.send else 'DRY RUN'}")

    client: smtplib.SMTP | None = None
    try:
        if args.send:
            for required in ["SMTP_HOST"]:
                if not os.environ.get(required):
                    print(f"{required} env var is required with --send.", file=sys.stderr)
                    return 2
            client = smtp_client()

        for row in targets:
            detail = f"{row['company']} <{row['email']}>"
            if args.send:
                msg = build_message(
                    row=row,
                    body=body,
                    subject=args.subject,
                    from_email=from_email,
                    from_name=args.from_name,
                    reply_to=reply_to,
                )
                try:
                    client.send_message(msg)
                    append_log(Path(args.log), row, "sent", args.subject)
                    print(f"sent: {detail}")
                except Exception as exc:  # noqa: BLE001
                    append_log(Path(args.log), row, "error", str(exc))
                    print(f"error: {detail}: {exc}", file=sys.stderr)
                time.sleep(args.sleep)
            else:
                append_log(Path(args.log), row, "dry_run", args.subject)
                print(f"dry-run: {detail}")
    finally:
        if client:
            client.quit()

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
