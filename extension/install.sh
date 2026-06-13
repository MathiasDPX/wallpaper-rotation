#!/usr/bin/env bash
# Install the GNOME Shell extension to ~/.local/share/gnome-shell/extensions/
set -euo pipefail

UUID="rotate-wallpaper@mathiasd.fr"
SRC_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEST_DIR="$HOME/.local/share/gnome-shell/extensions/$UUID"

echo "Installing $UUID ..."

mkdir -p "$DEST_DIR"
cp "$SRC_DIR/metadata.json" "$SRC_DIR/extension.js" "$DEST_DIR/"

echo
echo "Done! You need to restart GNOME"
echo "You will need to enable the extension with"
echo "  $ gnome-extensions enable "$UUID""
