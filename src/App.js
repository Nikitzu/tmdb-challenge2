import { Lightning, Utils, Router } from 'wpe-lightning-sdk';

import provider from "./lib/data-provider";
import routes from "./lib/routes";
import { init as initApi, getMenuWidgetItems } from "./lib/Api"
import { Menu } from "./components";

export default class App extends Lightning.Component {
    static getFonts() {
        return [
            { family: 'SourceSansPro-Regular', url: Utils.asset('fonts/SourceSansPro-Regular.ttf'), descriptors: {} } ,
            { family: 'SourceSansPro-Bold', url: Utils.asset('fonts/SourceSansPro-Bold.ttf'), descriptors: {} },
            { family: 'SourceSansPro-SemiBold', url: Utils.asset('fonts/SourceSansPro-SemiBold.ttf'), descriptors: {} }
        ];
    }

    static _template() {
        return {
            Pages: {
                forceZIndexContext: true, w: 1000
            },
            Widgets: {
                Menu:{
                    type: Menu,
                    x: 150,
                    y: 150
                }
            },
        };
    }

    static _states() {
        return [
            class Widgets extends this {
                $enter(args, widget) {
                    this._widget = widget;
                    this._refocus();
                }

                _getFocused() {
                    return this._widget;
                }
            }
        ];
    }

    get pages() {
        return this.tag("Pages");
    }

    get widgets() {
        return this.tag("Widgets")
    }

    _setup() {
        initApi(this.stage);
        Router.startRouter({
            appInstance: this, provider, routes
        });
        this._fillMenuWithItems();
    }

    _fillMenuWithItems() {
        getMenuWidgetItems().then(items => {
            this.widgets.getByRef('Menu').items = items;
        })
    }

    _getFocused() {
        return Router.getActivePage();
    }
}
