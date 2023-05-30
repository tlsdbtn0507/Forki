import View from './View';
import icons from "url:../../img/icons.svg";

class PageView extends View{
    _parentView = document.querySelector('.pagination');

    addHandlerClick(handler){
        this._parentView.addEventListener('click',function(e){
            const btn = e.target.closest('.btn--inline');

            if(!btn) return;
            
            const goToPage = +btn.dataset.goto;

            handler(goToPage);
        })
    }

    _generateMarkup(){
        const pageNums = Math.ceil(this._data.results.length/this._data.resultsPerPage);

        const curPage = this._data.page;
        if( curPage === 1 && pageNums > 1){
            return `
            <button data-goto="${curPage+1}" class="btn--inline pagination__btn--next">
                <span>Page ${curPage+1}</span>
                <svg class="search__icon">
                  <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>`;
        }

        if( curPage === pageNums && pageNums > 1){
            return`
            <button data-goto="${curPage-1}" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                  <use href="${icons}#icon-arrow-left"></use>
                </svg><span>Page ${curPage -1 }</span>
            </button>`;
        }

        if( curPage < pageNums){
            return `
            <button data-goto="${curPage-1}" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                  <use href="${icons}#icon-arrow-left"></use>
                </svg><span>Page ${curPage -1 }</span>
            </button>
            <button data-goto="${curPage+1}"  class="btn--inline pagination__btn--next">
                <span>Page ${curPage+1}</span>
                <svg class="search__icon">
                  <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>
            `;
        }

        return ``;
    }

}

export default new PageView();