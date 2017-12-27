import * as Api from '../utils/api';

export const RECEIVED_DECKS = 'RECEIVED_DECKS';
export const receivedDecks = (decks = {}) => ({
    type: RECEIVED_DECKS,
    decks
});

const REHYDRATE = 'REHYDRATE';
export const rehydrate = () => async (dispatch) => {
    let decks = await Api.getDecks();
    dispatch(receivedDecks(decks))
};