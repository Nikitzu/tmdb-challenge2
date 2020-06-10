import { Utils } from "wpe-lightning-sdk";

const apiKey = `66683917a94e703e14ca150023f4ea7c`;
let stage;

export const init = (stageInstance) =>{
    stage = stageInstance;
};

export const getMovies = async()=> {
    return await get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`);
};

export const getMenuWidgetItems = async () => {
    return await get(Utils.asset('menu-items.json'))
};

const get = async (url)=> {
    return await fetch(url, {
        'Accept': 'application/json'
    }).then(response => {
        return response.json();
    })
};
