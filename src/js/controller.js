import * as model from './model.js'
import recipeViews from './views/recipeViews.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const controlRecipe = async function(){
  try {
    recipeViews.renderSpinner();

    const id = window.location.hash.slice(1);

    if(!id) return;

    await model.loadRecipe(id);

    recipeViews.render(model.state.recipe);
  } catch (error) {
    alert(error)
  }
};

const init = () => {
  recipeViews.addHandleRender(controlRecipe);
};

init();

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
