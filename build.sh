#!/bin/bash
#
# Build script for AuctionMate Pro (Enyo 1.0 app, no companion service —
# unlike box, this is a single palm-package target: just the app directory).
#
# This ipk actually ships two UI implementations (a legacy Mojo tree for
# pre-3.0 devices, and this Enyo tree for webOS 3.0+/TouchPad) via an
# index.html version-check dispatcher. Since this restoration only targets
# a webOS 3.0.5 TouchPad, the Mojo tree was removed entirely — appinfo.json's
# "main" now points straight at enyo.html.
#
# palm-package bundles everything from appinfo.json/depends.js on its own
# when handed the app dir — same reasoning box/build.sh documents for not
# doing any .ipk post-processing (ar/tar surgery, injected postinst, etc.).
#
# This repo has no local devkit/ copy (see ../box or ../cbssports for that) —
# novacom.md documents that this project reuses the devkit at
# C:\Users\alanm\OneDrive\Documents\Projects\cbssports\devkit\SDK\bin, shelled
# out to via powershell.exe because cmd.exe has been unreliable through the
# WSL→Windows interop path. palm-package.bat/palm-install.bat confirmed to
# exist there.

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

APP_DIR="app/com.preciouscoders.pre.auctionmatepro"
DEVKIT_BIN='C:\Users\alanm\OneDrive\Documents\Projects\cbssports\devkit\SDK\bin'

# enyo/lib/ebay/eBayApiConfig.js holds only the broker base URL + app name
# (no eBay secret — that lives on the broker, never in the ipk). Without it
# the app has no EBayBroker config and login silently won't work, so make
# sure it exists before packaging — same pattern box/build.sh uses for api.js.
API_CFG="$APP_DIR/enyo/lib/ebay/eBayApiConfig.js"
API_CFG_EXAMPLE="$APP_DIR/enyo/lib/ebay/eBayApiConfig.js.example"
if [ ! -f "$API_CFG" ]; then
	if [ ! -f "$API_CFG_EXAMPLE" ]; then
		echo "ERROR: neither $API_CFG nor $API_CFG_EXAMPLE exists — cannot build."
		exit 1
	fi
	echo "NOTE: $API_CFG was missing; created it from eBayApiConfig.js.example."
	cp "$API_CFG_EXAMPLE" "$API_CFG"
fi

APP_ID="com.preciouscoders.pre.auctionmatepro"
VERSION=$(grep -o '"version"[[:space:]]*:[[:space:]]*"[^"]*"' "$APP_DIR/appinfo.json" | cut -d'"' -f4)
IPK_FILE="${APP_ID}_${VERSION}_all.ipk"

echo "Building version: $VERSION"

# WSL path -> Windows path for the powershell-invoked palm-package.
WIN_APP_DIR=$(wslpath -w "$SCRIPT_DIR/$APP_DIR")

powershell.exe -Command "& '$DEVKIT_BIN\\palm-package.bat' '$WIN_APP_DIR'"

if [ ! -f "$IPK_FILE" ]; then
	echo "ERROR: palm-package failed - IPK not created (check for one in \$SCRIPT_DIR from a Windows-side cwd)"
	exit 1
fi

echo ""
echo "Build successful: $IPK_FILE"
ls -lh "$IPK_FILE"
echo ""
echo "Install with: powershell.exe -Command \"& '$DEVKIT_BIN\\palm-install.bat' '$IPK_FILE'\""
