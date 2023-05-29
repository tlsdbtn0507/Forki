export const state = {
    recipe:{

    }
}

export const loadRecipe = async function(id){
    try {
        const res = await fetch
            (`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`);
        const {data, message} = await res.json();

        if(!res.ok) throw new Error(`${message} (${res.status})`);

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
        }
    } catch (error) {
        alert(error)
    }
    

}