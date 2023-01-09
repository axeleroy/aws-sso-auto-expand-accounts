#!/usr/bin/env bash

# Packs the extension for Firefox and Chrome

function packfiles() {
  zip aws-sso-auto-expand-accounts-"$1"-"$2".zip assets/icon*.png manifest.json auto-expand.js
}

VERSION=$(jq -r '.version' < manifest.json)
packfiles "firefox" "$VERSION"
sed -i 's/"manifest_version": 2/"manifest_version": 3/' manifest.json
packfiles "chrome" "$VERSION"
# Reset Manifest to v2
git checkout HEAD -- manifest.json
