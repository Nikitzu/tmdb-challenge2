import { Lightning } from 'wpe-lightning-sdk';

export default class MenuItem extends Lightning.Component {
    static _template() {
        return {
            color: 0xff52574f,
            text: { text: '', fontFace: 'SourceSansPro-Regular', fontSize: 30 }
        };
    }

    set label(label) {
        this.text.text = label;
    }

    set action(action) {
        this._action = action;
    }

    get action() {
        return this._action;
    }

    _focus() {
        this.patch({
            smooth: { color: 0xffffffff, scale: 1.5 }
        });
    }

    _unfocus() {
        this.patch({
            smooth: { color: 0xff52574f, scale: 1 }
        });
    }
}
