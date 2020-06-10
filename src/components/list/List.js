import { Lightning } from "wpe-lightning-sdk";
import Item from "./item/Item";

export default class List extends Lightning.Component {
    static _template() {
        return {
            Label: {
                text: {text: '', fontFace: 'SourceSansPro-SemiBold'}
            },
            Items: {
                y: 120
            }
        }
    }

    get visibleItemsNumber() {
        return Math.floor(3000 / (this._itemSize.w + 100));
    }

    set label(v) {
        this.tag('Label').text = v;
    }

    set movies(v) {
        this.tag('Items').children = v.map((movie, index) => {
            return {
                type: Item,
                x: index * (this._itemSize.w + 100),
                item: movie,
            }
        });
    }

    get items() {
        return this.tag("Items").children;
    }

    get activeItem() {
        return this.items[this._index];
    }

    _init() {
        this._index = 0;
        this._itemSize = {
            w: 300,
            h: 400
        };
        this._indexCounter = 0;
    }

    _handleLeft() {
        if (this._index > 0) {
            this.setIndex(this._index - 1);
        }
    }

    _handleRight() {
        if (this._index < this.items.length - 1) {
            this.setIndex(this._index + 1);
        }
    }

    _getFocused() {
        return this.activeItem;
    }

    setIndex(index) {
        const previousIndex = this._index;
        this._index = index;
        if (index > previousIndex) {
            if (this._indexCounter < this.visibleItemsNumber) {
                this._indexCounter++;
            }
            if (this._indexCounter === this.visibleItemsNumber) {
                this.tag('Items').setSmooth('x', -(index - this._indexCounter) * (this._itemSize.w + 100));
            }
        } else if (index < previousIndex) {
            if (this._indexCounter > 0) {
                this._indexCounter--;
            }
            if (this._indexCounter === 0) {
                this.tag('Items').setSmooth('x', -index * (this._itemSize.w + 100));
            }
        }
    }
}
