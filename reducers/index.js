import * as Actions from '../actions';

export default decks = (state = {}, action) => {
    switch (action.type){
        case Actions.RECEIVED_DECKS:
            return {
              ...state,
              ...action.decks
            };

        default:
            return state;
    }
}