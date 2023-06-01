import { mark } from "regenerator-runtime";
import icons from "url:../../img/icons.svg";

export default class View{
    _data

    render(data, render = true){
        if(!data || (Array.isArray(data) && data.length === 0)) 
        return this.renderError();

        this._data = data;
        const markup = this._generateMarkup();

        if(!render) return markup;

        this._clear();
        this._parentView.insertAdjacentHTML('afterbegin',markup);
    }

    update(data){

        this._data = data;
        const newMarkup = this._generateMarkup();
        const newDom = document.createRange().createContextualFragment(newMarkup);

        const newEl = Array.from(newDom.querySelectorAll('*'));
        const curEle = Array.from(this._parentView.querySelectorAll('*'));

        newEl.forEach((e,i)=>{
            const curEl = curEle[i];
            if(!e.isEqualNode(curEl) && e.firstChild?.nodeValue.trim() !== '')
            curEl.textContent = e.textContent;

            if(!e.isEqualNode(curEl)) Array.from(e.attributes)
            .forEach(attr=>curEl.setAttribute(attr.name,attr.value));
        })
    }

    addHandleRender(handler){
      ['hashchange','load'].forEach(ev => window.addEventListener(ev,handler));
    }

    renderSpinner(){
        const markup = 
            `<div class="spinner">
                    <svg>
                      <use href="${icons}#icon-loader"></use>
                    </svg>
            </div>`;
        this._clear();
        this._parentView.insertAdjacentHTML('afterbegin',markup);
    }

    renderError(message = this._errorMsg){
      const markup = `
      <div class="error">
        <div>
          <svg><use href="${icons}#icon-alert-triangle"></use></svg>
        </div>
        <p>${message}</p>
      </div>`;
      this._clear();
      this._parentView.insertAdjacentHTML('afterbegin',markup);
    }

    renderMessage(message = this._msg){
      const markup = `
      <div class="message">
        <div>
          <svg><use href="${icons}#icon-smile"></use></svg>
        </div>
        <p>${message}</p>
      </div>`;
      this._clear();
      this._parentView.insertAdjacentHTML('afterbegin',markup);
    }

    _clear(){
        this._parentView.innerHTML = '';
    }
}
