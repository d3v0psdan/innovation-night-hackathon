#!/usr/bin/env bash
# Blocks destructive commands. Exit 2 = blocked and Claude sees why.
# Windows Git Bash only finds Herd php.bat. Make bare php work.
command -v php >/dev/null 2>&1 || php() { php.bat "$@"; }
CMD=$(php -r '$j=json_decode(stream_get_contents(STDIN),true); echo $j["tool_input"]["command"] ?? "";')

if echo "$CMD" | grep -Eq 'db:wipe|git reset --hard|git clean -f|git push (-f|--force)'; then
  echo "Blocked by guard.sh. Too destructive for hackathon night. Ask Daniel first." >&2
  exit 2
fi

# migrate:fresh is handy for demos, so ask instead of block
if echo "$CMD" | grep -q 'migrate:fresh'; then
  echo '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"ask","permissionDecisionReason":"migrate:fresh wipes the database. OK?"}}'
  exit 0
fi
exit 0
