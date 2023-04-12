#!/usr/bin/env bash

# Packs the extension for Firefox and Chrome

function packfiles() {
  zip aws-sso-auto-expand-accounts-"$1".zip assets/icon*.png manifest.json auto-expand.js
}

VERSION=$(jq -r '.version' < manifest.json)
packfiles "$VERSION"
