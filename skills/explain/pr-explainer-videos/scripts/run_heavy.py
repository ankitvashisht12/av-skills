"""Run one memory-heavy media command at a time across this batch."""

import fcntl
import subprocess
import sys
from pathlib import Path


def main():
    command = sys.argv[1:]
    if command and command[0] == "--":
        command = command[1:]
    if not command:
        raise SystemExit("Usage: python3 run_heavy.py -- COMMAND [ARGUMENT ...]")
    lock_path = Path(__file__).with_name("render.lock")
    with lock_path.open("a") as render_lock:
        fcntl.flock(render_lock, fcntl.LOCK_EX)
        result = subprocess.run(command)
    raise SystemExit(result.returncode)


if __name__ == "__main__":
    main()
