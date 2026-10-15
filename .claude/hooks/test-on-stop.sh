#!/usr/bin/env bash
# Runs tests when Claude says it's done. Failing tests send it back to fix them.
# Windows Git Bash only finds Herd php.bat. Make bare php work.
command -v php >/dev/null 2>&1 || php() { php.bat "$@"; }
INPUT=$(cat)
# Already looping from a previous block? Let it stop so we never spin forever.
echo "$INPUT" | grep -Eq '"stop_hook_active": ?true' && exit 0
cd "$CLAUDE_PROJECT_DIR" || exit 0
CODE=(app routes resources database tests config ':!tests/Browser/Screenshots')
# Only bother if code actually changed (git status also sees new untracked files, git diff HEAD does not)
[ -z "$(git status --porcelain -- "${CODE[@]}" 2>/dev/null)" ] && exit 0

# Skip if the code is byte-identical to the last gate run, so turns spent on docs, pitch,
# or other unrelated work never get blocked by failures they did not cause.
STAMP="$(git rev-parse --git-dir)/claude-stop-tests"
FINGERPRINT=$({
  git diff HEAD -- "${CODE[@]}"
  git ls-files -o --exclude-standard -z -- "${CODE[@]}" | xargs -0 -r git hash-object --
  git ls-files -o --exclude-standard -- "${CODE[@]}"
} | git hash-object --stdin)
[ "$FINGERPRINT" = "$(cat "$STAMP" 2>/dev/null)" ] && exit 0
echo "$FINGERPRINT" > "$STAMP"

# Browser suite is slow (~70s) and often mid-debug; run it explicitly with --testsuite=Browser.
OUT=$(php artisan test --compact --testsuite=Unit,Feature 2>&1)
if [ $? -ne 0 ]; then
  echo "Tests are failing. Fix them before finishing." >&2
  echo "$OUT" | tail -40 >&2
  exit 2
fi
exit 0
