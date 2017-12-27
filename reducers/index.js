import * as Actions from '../actions';

export default decks = (state = {}, action) => {
    switch (action.type){
        case Actions.RECEIVED_DECKS:
            return {
              ...state,
              ...action.decks
            };

        case Actions.ADD_DECK:
            return {
                ...state,
                ...action.deck
            };

        case Actions.CARD_ADDED:
            const { key, card } = action;
            return {
              ...state,
                [key]:{
                  ...state[key],
                    questions: state[key].questions.concat([card])
                }
            };

        default:
            return state;
    }
}