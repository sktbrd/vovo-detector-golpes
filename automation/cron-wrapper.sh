#!/bin/bash
# OpenClaw Cron Wrapper
# Executa automação diária e reporta status via message tool

set -euo pipefail

WORKSPACE="/Users/vladnikolaev/.openclaw/workspace-freelancer/vovo"
LOG_FILE="$WORKSPACE/automation/data/reports/cron-$(date +%Y-%m-%d).log"

cd "$WORKSPACE"

echo "🌅 [$(date +"%Y-%m-%d %H:%M:%S")] Starting daily automation..." | tee -a "$LOG_FILE"

# Run automation
if pnpm tsx automation/daily/run.ts 2>&1 | tee -a "$LOG_FILE"; then
  STATUS="✅ SUCCESS"
  EXIT_CODE=0
else
  STATUS="❌ FAILED"
  EXIT_CODE=$?
fi

# Read report
REPORT_DATE=$(date +%Y-%m-%d)
REPORT_FILE="$WORKSPACE/automation/data/reports/${REPORT_DATE}.json"

if [ -f "$REPORT_FILE" ]; then
  CONTENT_STATUS=$(jq -r '.tasks.contentGeneration.status' "$REPORT_FILE")
  ARTICLES=$(jq -r '.tasks.contentGeneration.articlesCreated // 0' "$REPORT_FILE")
else
  CONTENT_STATUS="unknown"
  ARTICLES=0
fi

# Format message for Telegram
MESSAGE="🤖 Vovó Daily Report - ${REPORT_DATE}

$STATUS

📝 Content Generation: ${CONTENT_STATUS}
📄 Articles Created: ${ARTICLES}
📊 Search Console: skipped (not implemented)

---
Log: automation/data/reports/cron-${REPORT_DATE}.log"

echo "$MESSAGE" | tee -a "$LOG_FILE"

# Send to Telegram via OpenClaw message tool
# (OpenClaw will automatically route to current channel)
echo "$MESSAGE"

exit $EXIT_CODE
