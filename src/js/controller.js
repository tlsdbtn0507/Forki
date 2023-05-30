import { async } from 'regenerator-runtime';
import * as model from './model.js'
import recipeViews from './views/recipeViews.js';
import searchView from './views/searchView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import resultsView from './views/resultsView.js';

if(module.hot){
  module.hot.accept();
}

const controlRecipe = async function(){
  try {
    recipeViews.renderSpinner();

    const id = window.location.hash.slice(1);

    if(!id) return;

    await model.loadRecipe(id);

    recipeViews.render(model.state.recipe);
  } catch (error) {
    recipeViews.renderError();
  }
};

const controlSearch = async function(){
  try {
    resultsView.renderSpinner();

    const query = searchView.getQuery();
    if(!query) return;

    await model.loadSearchResult(query);

    resultsView.render(model.state.search.results);

  } catch (error) {
    
  }
}

const init = () => {
  recipeViews.addHandleRender(controlRecipe);
  searchView.addHandlerSearch(controlSearch);
};

init();
