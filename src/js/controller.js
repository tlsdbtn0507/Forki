import { async } from 'regenerator-runtime';
import * as model from './model.js'
import recipeViews from './views/recipeViews.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import PageView from './views/PageView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// if(module.hot){
//   module.hot.accept();
// }

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

    resultsView.render(model.searchResultPage(1));
    PageView.render(model.state.search)

  } catch (error) {
    
  }
}

const controlPagination = (goToPage)=>{
  resultsView.render(model.searchResultPage(goToPage));
  PageView.render(model.state.search)
}

const controlServings = function(e){

  model.updateServings(e);
  recipeViews.render(model.state.recipe);
}

const init = () => {
  recipeViews.addHandleRender(controlRecipe);
  recipeViews.addHandleUpdatingServings(controlServings);
  searchView.addHandlerSearch(controlSearch);
  PageView.addHandlerClick(controlPagination);
};

init();
