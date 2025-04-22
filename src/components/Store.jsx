import { createStore } from 'redux';
// Define the initial state
const initialState = {
  censusRegion: "none",
  censusData: []
};

/**
 * Reducer function to manage the state updates.
 * 
 * @param {object} state - The current state.
 * @param {object} action - The action dispatched.
 * @returns {object} The updated state.
 */
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'censusRegion':
      return { ...state, censusRegion: action.payload };
    case 'censusBlockData':
      return { ...state, censusData: action.payload};
    default:
      return state;
  }
}

/**
 * Updates the dashboard date.
 * 
 * @param {string} date - The chosen census block data.
 * @returns {object} The action.
 */
export function setCensusRegion(date) {
    return { type: 'censusRegion', payload: date };
}

/**
 * Updates the censusBlockData.
 * 
 * @param {Array} data - The census data.
 * @returns {object} The action.
 */
export function setCensusBlockData(data) {
  return { type: 'censusBlockData', payload: data };
}


// Create the Redux store
const store = createStore(reducer);

export default store;