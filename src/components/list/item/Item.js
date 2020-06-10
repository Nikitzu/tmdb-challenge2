import { Lightning } from "wpe-lightning-sdk";

export default class Item extends Lightning.Component{
    static _template() {
        return {
            Image: {
            },
            Title: {
                y: 420,
                x: 20,
                text: { fontFace: "SourceSansPro-Light.ttf", fontSize: 30 }
            }
        }
    }

    get _averageTitleLength() {
        return 20;
    }

    set item(v){
        const sizes = {
            w: 300,
            h: 400
        };
        this._getTitleOfTheItem(v);
        this.patch({
            ...sizes,
            Image: {
                ...sizes,
                src: `https://image.tmdb.org/t/p/w220_and_h330_face${v.poster_path}`
            },
            Title: {
                text: v.title,
            }
        });
        this.tag('Image').src = `https://image.tmdb.org/t/p/w220_and_h330_face${v.poster_path}`;
        this.tag('Title').text = this._shortTitle || this._fullTitle;
    }

    _focus() {
        this.setSmooth("scale", 1.2);
        this.setSmooth("alpha", 1);
        if (this._fullTitle) {
            this.tag('Title').patch({ text: `${this._fullTitle}` })
        }
    }

    _unfocus() {
        this.setSmooth("scale", 1);
        this.setSmooth("alpha", 0.5);
        if (this._shortTitle) {
            this.tag('Title').patch({ text: `${this._shortTitle}` })
        }
    }

    _getTitleOfTheItem(item) {
        if (item.title.length > this._averageTitleLength) {
            this._fullTitle = item.title;
            this._shortTitle = item.title.slice(0,20) + '...';
        }
    }
}
