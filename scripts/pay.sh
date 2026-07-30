#!/usr/bin/env bash
set -euo pipefail
API_URL="${POWERCHAIN_API_URL:-http://localhost:4000/api/v1}"
RAIL="${1:-x402}"
AMOUNT="${2:-1.00}"
curl --fail --silent --show-error   -X POST "$API_URL/payments/intents"   -H "content-type: application/json"   -d "{"rail":"$RAIL","amountUsd":$AMOUNT,"reference":"cli_$(date +%s)"}"
echo
