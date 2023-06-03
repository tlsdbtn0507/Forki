import { async } from 'regenerator-runtime';
import * as config from './config.js'
import { ajax } from './helpers.js'

export const state = {
    recipe:{},
    search:{
        query:'',
        results:[],
        page:1,
        resultsPerPage:config.RES_PER_PAGE
    },
    bookMark:[],
}

const makingRecipeObject = (data) =>{
    return {
        id:data.id,
        title:data.title,
        image:data.image_url,
        publisher:data.publisher,
        cookingTime:data.cooking_time,
        servings:data.servings,
        ingredients:data.ingredients,
        sourceUrl:data.source_url,
        ...( data.key && { key:data.key })
    }
}

export const loadRecipe = async function(id){
    try {
        const data = await ajax(`${config.API_url}/${id}?key=${config.KEY}`)

        const {recipe} = data ;

        state.recipe = makingRecipeObject(recipe);

        if(state.bookMark.some(bm => bm.id === id))
            state.recipe.bookMarked = true;
        else
            state.recipe.bookMarked = false;

    } catch (error) {
        throw(error);
    }
};

export const loadSearchResult = async function(query){
    try {
        const data = await ajax(`${config.API_url}?search=${query}&key=${config.KEY}`);

        state.search.query = query;
        state.search.results = data.recipes.map(rec => {
            return {
                id:rec.id,
                title:rec.title,
                image:rec.image_url,
                publisher:rec.publisher,
                ...( rec.key && { key:rec.key })
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

export const updateServings = function(newServings){
    state.recipe.ingredients.forEach(e => {
        e.quantity = e.quantity * newServings / state.recipe.servings;
    });

    state.recipe.servings = newServings;
}

const addBmToLocal = function(){
    localStorage.setItem('bookmarks',JSON.stringify(state.bookMark))
}

export const addBookMark = function(recipe){
    state.bookMark.push(recipe);

    if(recipe.id === state.recipe.id) state.recipe.bookMarked = true;
    addBmToLocal();
}

export const deleteBookMark = function(id){
    const index = state.bookMark.findIndex(el => el.id === id);
    
    state.bookMark.splice(index,1);

    if(id === state.recipe.id) state.recipe.bookMarked = false;
    addBmToLocal();
}

const init = function(){
    const storage = localStorage.getItem('bookmarks');

    if(storage) state.bookMark = JSON.parse(storage); 
}

export const addNewRecipe = async function(newRecipe){
    try {
        const ingredients = Object.entries(newRecipe)
        .filter(e=>e[0].startsWith('ingredient') && e[1] !== '')
        .map(ing=>{
            const ingArr = ing[1].replaceAll(' ','').split(',');

            if(ingArr.length !== 3) throw new Error('Wrong Format!')

            const [ quantity,unit,description ] = ingArr;
            return { quantity : quantity ? + quantity : null ,unit,description }
        });
        const recipeObj = {
            id :newRecipe.id,
            title :newRecipe.title,
            image_url :newRecipe.image,
            publisher :newRecipe.publisher,
            cooking_time :+newRecipe.cookingTime,
            servings :+newRecipe.servings,
            ingredients : ingredients,
            source_url :newRecipe.sourceUrl,
        }
        const {recipe} = await ajax(`${config.API_url}?key=${config.KEY}`,recipeObj);

        state.recipe = makingRecipeObject(recipe);
        addBookMark(state.recipe)

    } catch (error) {
        throw error
    }

   
    

}

init();