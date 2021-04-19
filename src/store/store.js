import { createStore } from 'redux';
import reducer from './reducer';

export const initialState = {
  sum: 0,
  count: 0,
  chunkData: []
};

const store = createStore(reducer, initialState);

export default store;
