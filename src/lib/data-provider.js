import { Router } from "wpe-lightning-sdk";
import { getMovies } from './Api';

export default () => {
    Router.boot(async()=> {
        Router.navigate('splash')
    });

    Router.before("movies", async ({page})=>{
        page.movies = await getMovies();
    }, 500);
}
