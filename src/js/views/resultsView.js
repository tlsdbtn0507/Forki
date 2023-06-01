import View from './View'
import PreviewView from './PreviewView';

class ResultsView extends View{
    _parentView = document.querySelector('.results');
    _errorMsg = 'We could not get recipes of food, Please use another one!'
    _msg = '';

    _generateMarkup(){
      return this._data.map(res=> PreviewView.render(res,false)).join('');
  }
}

export default new ResultsView();