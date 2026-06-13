import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import * as PopupMenu from 'resource:///org/gnome/shell/ui/popupMenu.js';
import * as Util from 'resource:///org/gnome/shell/misc/util.js';

import {Extension} from 'resource:///org/gnome/shell/extensions/extension.js';

const ROTATE_LABEL = 'Rotate Background';
const ROTATE_COMMAND = [
    '/usr/bin/python3',
    '/home/mathias/Documents/Code/wallpaper-rotation/rotate.py',
];

// Modify a single background popup menu: remove the default
// "Change Background" entry and insert a
// "Rotate Background" entry at the top.
function modifyMenu(menu) {
    if (!menu || menu._rotateBackgroundPatched)
        return;

    const items = menu._getMenuItems();
    if (items.length > 0)
        items[0].destroy(); // "Change Background"

    const item = new PopupMenu.PopupMenuItem(ROTATE_LABEL);
    item.connect('activate', () => {
        Util.spawn(ROTATE_COMMAND);
    });
    menu.addMenuItem(item, 0);

    menu._rotateBackgroundPatched = true;
}

export default class RotateBackgroundExtension extends Extension {
    enable() {
        const layoutManager = Main.layoutManager;
        const proto = layoutManager.constructor.prototype;

        this._origAddBackgroundMenu = proto._addBackgroundMenu;
        const origAddBackgroundMenu = this._origAddBackgroundMenu;
        proto._addBackgroundMenu = function (bgManager) {
            origAddBackgroundMenu.call(this, bgManager);
            modifyMenu(bgManager.backgroundActor._backgroundMenu);
        };

        layoutManager._updateBackgrounds().catch(logError);
    }

    disable() {
        const layoutManager = Main.layoutManager;
        const proto = layoutManager.constructor.prototype;

        if (this._origAddBackgroundMenu) {
            proto._addBackgroundMenu = this._origAddBackgroundMenu;
            this._origAddBackgroundMenu = null;
        }

        // Rebuild backgrounds so the default menus are restored
        layoutManager._updateBackgrounds();
    }
}