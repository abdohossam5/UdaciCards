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

export const ADD_DECK = 'ADD_DECK';
export const addDeck = (deck) => ({
    type: ADD_DECK,
    deck
});

export const requestAddDeck = (name) => async (dispatch) => {
    let deck = await Api.saveDeckTitle(name);
    dispatch(addDeck(deck))
};

export const CARD_ADDED = 'CARD_ADDED';
export const cardAdded = (key, card) => ({
    type: CARD_ADDED,
    card,
    key
});

export const addCardToDeck = (key, {question, answer}) => async (dispatch) => {
    await Api.addCardToDeck(key, {question, answer});
    dispatch(cardAdded(key, {question, answer}))
};