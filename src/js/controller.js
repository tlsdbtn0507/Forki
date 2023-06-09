import { async } from 'regenerator-runtime';
import { CLOSE_WINDOW } from './config.js'
import * as model from './model.js'
import recipeViews from './views/recipeViews.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import PageView from './views/PageView.js';
import BookMarksView from './views/BookMarksView.js';
import addRecipeView from './views/addRecipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// if(module.hot){
//   module.hot.accept();
// }

const controlRecipe = async function(){
  try {
    recipeViews.renderSpinner();

    resultsView.update(model.searchResultPage());
    BookMarksView.update(model.state.bookMark)

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
  recipeViews.update(model.state.recipe);
}

const controlBookMark = function(){

  if(!model.state.recipe.bookMarked) model.addBookMark(model.state.recipe);
  else model.deleteBookMark(model.state.recipe.id);

  recipeViews.update(model.state.recipe);

  BookMarksView.render(model.state.bookMark);
}

const bookMarkRender = function(){
  BookMarksView.render(model.state.bookMark);
}

const addRecipe = async function(newRecipe){
  try {
    addRecipeView.renderSpinner();

    await model.addNewRecipe(newRecipe);

    recipeViews.render(model.state.recipe);

    addRecipeView.renderMessage();

    addRecipeView.render(model.state.bookMark);

    window.history.pushState(null,'',`#${model.state.recipe.id}`);

    setTimeout( function(){
      addRecipeView.toggleWindow()      
    }, CLOSE_WINDOW*1000);
  } catch (error) {
    addRecipeView.renderError(error.message);
  }
}

const init = () => {
  BookMarksView.addHandleRender(bookMarkRender);
  recipeViews.addHandleRender(controlRecipe);
  recipeViews.addHandleUpdatingServings(controlServings);
  recipeViews.addHandlerBookMark(controlBookMark);
  searchView.addHandlerSearch(controlSearch);
  PageView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(addRecipe)
};

init();
