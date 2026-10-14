#!/usr/bin/env bash
# Formats whatever file Claude just edited. Never blocks.
# Windows Git Bash only finds Herd php.bat. Make bare php work.
command -v php >/dev/null 2>&1 || php() { php.bat "$@"; }
FILE=$(php -r '$j=json_decode(stream_get_contents(STDIN),true); echo $j["tool_input"]["file_path"] ?? "";')
[ -z "$FILE" ] && exit 0
cd "$CLAUDE_PROJECT_DIR" || exit 0
case "$FILE" in
  *.php) php vendor/bin/pint "$FILE" >/dev/null 2>&1 ;;
  # The Laravel 13 starter formats with vite-plus (oxfmt), not Prettier. Prettier is the fallback for older starters.
  *.ts|*.tsx|*.css|*.json)
    if [ -x node_modules/.bin/vp ]; then npx vp fmt "$FILE" >/dev/null 2>&1; else npx prettier --write "$FILE" >/dev/null 2>&1; fi ;;
esac
exit 0
