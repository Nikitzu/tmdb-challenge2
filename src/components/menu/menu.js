import { Lightning, Router } from 'wpe-lightning-sdk';
import MenuItem from './menu-item';

export default class Menu extends Lightning.Component {
    static _template() {
        return {
            MenuItems: {
                children: []
            }
        };
    }

    get activeItem() {
        return this.items[this._index];
    }

    get items() {
        return this.tag('MenuItems').children;
    }

    set items(items) {
        this.tag('MenuItems').children = items.map((item, idx) => {
            return {
                type: MenuItem,
                action: item.action,
                label: item.label,
                x: idx * 250
            };
        });
    }

    _init() {
        this._index = 0;
    }

    _setIndex(idx) {
        this._index = idx;
    }

    _getFocused() {
        return this.activeItem;
    }

    _handleLeft() {
        this._setIndex(Math.max(0, --this._index));
    }

    _handleRight() {
        this._setIndex(Math.min(++this._index, this.items.length - 1));
    }
    _handleEnter() {
        this.signal('select', { item: this.activeItem });
    }

    _handleDown() {
        Router.restoreFocus();
    }
}
