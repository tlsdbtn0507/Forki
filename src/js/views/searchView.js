class SearchView{
    _parentEl =  document.querySelector('.search')

    getQuery(){
        const query = this._parentEl.querySelector('.search__field').value;
        this._getClear();
        return query;
    }

    _getClear(){
        this._parentEl.querySelector('.search__field').value = '';
    }

    addHandlerSearch(handle){
        this._parentEl.addEventListener('submit',function(e){
            e.preventDefault();
            handle();
        })
    }
}

export default new SearchView();