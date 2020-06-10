import { Lightning, Router } from 'wpe-lightning-sdk';

import { List, Logo } from "../components"

export default class Main extends Lightning.Component{
    static _template() {
        return {
            scale: 0.5,
            Lists: {
                type: List,
                x: 100,
                y: 560,
                zIndex: 3,
            },
            Logo: {
                type: Logo,
                x: 120,
                y: 120
            }
        };
    }

    set movies(movies) {
        this.tag('Lists').label = 'Popular';
        this.tag('Lists').movies = movies.results;
    }

    _init() {
        this._index = 0;
        this._getFocused();
    }

    _getFocused() {
        return this.tag('Lists')
    }

    _handleUp() {
        Router.focusWidget('Menu')
    }
}
