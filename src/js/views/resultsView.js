import View from './View'

class ResultsView extends View{
    _parentView = document.querySelector('.results');
    _errorMsg = 'We could not get recipes of food, Please use another one!'
    _msg = '';

    _generateMarkup(){
        return this._data.map(e=>this._generateMarkupPreview(e)).join('');
    }

    _generateMarkupPreview(result){
      let id = window.location.hash.slice(1);

      let active = id === result.id ? ` preview__link--active` : '';
        return`
        <li class="preview">
            <a class="preview__link${active}" href="#${result.id}">
              <figure class="preview__fig">
                <img src="${result.image}" alt="${result.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${result.title}</h4>
                <p class="preview__publisher">${result.publisher}</p>
              </div>
            </a>
        </li>`
    }
}

export default new ResultsView();