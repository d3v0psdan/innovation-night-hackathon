#!/usr/bin/env bash
# Runs tests when Claude says it's done. Failing tests send it back to fix them.
# Windows Git Bash only finds Herd php.bat. Make bare php work.
command -v php >/dev/null 2>&1 || php() { php.bat "$@"; }
INPUT=$(cat)
# Already looping from a previous block? Let it stop so we never spin forever.
echo "$INPUT" | grep -Eq '"stop_hook_active": ?true' && exit 0
cd "$CLAUDE_PROJECT_DIR" || exit 0
# Only bother if code actually changed (git status also sees new untracked files, git diff HEAD does not)
[ -z "$(git status --porcelain -- app routes resources database tests 2>/dev/null)" ] && exit 0

OUT=$(php artisan test --compact 2>&1)
if [ $? -ne 0 ]; then
  echo "Tests are failing. Fix them before finishing." >&2
  echo "$OUT" | tail -40 >&2
  exit 2
fi
exit 0
