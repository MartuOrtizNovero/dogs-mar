import { createStore, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducer from '../reducer';

export const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));// con este middleware puedo hacer el
                                                                                    // fech/axios en las action creators que
                                                                                // hacen pedidos a la api(codigo asincrono)