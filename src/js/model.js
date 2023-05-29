import * as config from './config.js'
import { getJSON } from './helpers.js'

export const state = {
    recipe:{

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
            cookingTime:recipe.cooking_time,
            servings:recipe.servings,
            ingredients:recipe.ingredients,
            publisher:recipe.publisher,
            sourceUrl:recipe.source_url,
        };
    } catch (error) {
        alert(error);
    }
}