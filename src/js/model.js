import { async } from 'regenerator-runtime';
import * as config from './config.js'
import { getJSON } from './helpers.js'

export const state = {
    recipe:{},
    search:{
        query:'',
        results:[],
        page:1,
        resultsPerPage:config.RES_PER_PAGE
    }
}

export const loadRecipe = async function(id){
    try {
        const data = await getJSON(`${config.API_url}/${id}`)

        const {recipe} = data ;

        state.recipe = {
            id:recipe.id,
            title:recipe.title,
            image:recipe.image_url,
            publisher:recipe.publisher,
            cookingTime:recipe.cooking_time,
            servings:recipe.servings,
            ingredients:recipe.ingredients,
            sourceUrl:recipe.source_url,
        };
    } catch (error) {
        throw(error);
    }
};

export const loadSearchResult = async function(query){
    try {
        const data = await getJSON(`${config.API_url}?search=${query}`);

        state.search.query = query;
        state.search.results = data.recipes.map(rec => {
            return {
                id:rec.id,
                title:rec.title,
                image:rec.image_url,
                publisher:rec.publisher,
            }
        });
    } catch (error) {
        throw(error)
    }
};

export const searchResultPage = function(page = state.search.page){
    state.search.page = page

    const start = (page-1)*state.search.resultsPerPage;
    const end = page * state.search.resultsPerPage;

    return state.search.results.slice(start,end)
}