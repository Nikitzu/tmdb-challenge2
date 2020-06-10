import { Router } from "wpe-lightning-sdk";

import {
     Main, Splash
} from '../pages';

export default () =>{

    Router.root('splash', Splash);

    Router.route('movies', Main);

    Router.start();
}
