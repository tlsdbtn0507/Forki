import View from './View';
import icons from "url:../../img/icons.svg";

class AddRecipeView extends View{
    _parentView = document.querySelector('.upload');
    _msg = 'The Recipe was succesfully updated'
    _window = document.querySelector('.add-recipe-window');
    _overlay = document.querySelector('.overlay');
    _openBtn = document.querySelector('.nav__btn--add-recipe');
    _closeBtn = document.querySelector('.btn--close-modal');

    constructor(){
        super();
        this._addHandlerShowWindow();
        this._addHandlerCloseWindow();
    }

    toggleWindow(){
        this._overlay.classList.toggle('hidden');
        this._window.classList.toggle('hidden');
    }

    _addHandlerShowWindow(){
        this._openBtn.addEventListener('click',this.toggleWindow.bind(this));
    }

    _addHandlerCloseWindow(){
        this._closeBtn.addEventListener('click',this.toggleWindow.bind(this));
        this._overlay.addEventListener('click',this.toggleWindow.bind(this));
    }

    addHandlerUpload(handler){
        this._parentView.addEventListener('submit',function(e){
            e.preventDefault();

            const dataArr = [...new FormData(this)];
            const data = Object.fromEntries(dataArr);

            handler(data)
        })
    }

    _generateMarkup(){
    }

}

export default new AddRecipeView();