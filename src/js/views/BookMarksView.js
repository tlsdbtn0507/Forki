import View from './View';
import PreviewView from './PreviewView';


class BookMarksView extends View{
    _parentView = document.querySelector('.bookmarks__list');
    _errorMsg = 'No bookMarks yet, plz find a nice recipe and bookmark it'
    _msg = '';

    _generateMarkup(){
        return this._data.map(bm=> PreviewView.render(bm,false)).join('');
    }
}

export default new BookMarksView();