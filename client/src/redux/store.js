import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'; // Sirve para trabajar con llamadas asincronas
import {composeWithDevTools} from 'redux-devtools-extension'; // Importo con devTools para mejor manejo de sintaxis
import rootReducer from './reducer';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;