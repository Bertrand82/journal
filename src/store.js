import { createStore } from 'redux';
import rootReducer from './reducers'; // Combine your reducers here

const store = createStore(rootReducer); // Create Redux store

export default store;