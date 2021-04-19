import { initialState } from './store';
import { SET_DATA, CLEAR_DATA } from './actions';

function reducer(state, action) {
    switch (action.type) {
      case SET_DATA: {
        return {
          ...state,
          sum: state.sum + action.data.value, 
          count: state.count + 1,
          chunkData: state.chunkData.length < 1000000 ? 
                    [...state.chunkData, action.data.value] : 
                    state.chunkData,
        };
      }
      case CLEAR_DATA: {
        return {
          ...initialState
        }
      }
      default: {
        return state;
      }
    }
  }
  
  export default reducer;