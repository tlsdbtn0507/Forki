import * as model from './model.js'
import recipeViews from './views/recipeViews.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

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

controlRecipe();

['hashchange','load'].forEach(ev => window.addEventListener(ev,controlRecipe));

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
