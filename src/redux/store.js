import {applyMiddleware, createStore} from 'redux';
import { save, load } from "redux-localstorage-simple";
import reducer from './reducers';



const createStoreWithMiddleware = applyMiddleware(
    save({ states: ['credentials', 'getsearchproject']})
)(createStore);
const store = createStoreWithMiddleware(
    reducer,
    load({ states: ['credentials', 'getsearchproject']}),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({
        trace: true,
    })
);
export default store;