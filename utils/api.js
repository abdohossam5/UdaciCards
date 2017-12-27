import {AsyncStorage} from 'react-native';
import {getDeckKeyFromTitle} from './helpers'

const STORAGE_KEY = "UDACICARDS";
const initialState = {};

export const getDecks = async () => {
  let Decks = await AsyncStorage.getItem(STORAGE_KEY);
  if(!Decks) return {};
  return JSON.parse(Decks);
};

export const getDeck = async ({key, title}) => {
    if(title && !key) key = getDeckKeyFromTitle(title);
    let Decks = await AsyncStorage.getItem(STORAGE_KEY);
    if(Decks) Decks = JSON.parse(Decks);
    return (Decks && Decks[key]) || {};
};

export const saveDeckTitle = async (title) => {
    const key = getDeckKeyFromTitle(title);
    await AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
        [key]: {title, questions: []}
    }));
    let decks = await AsyncStorage.getItem(STORAGE_KEY);
    decks = JSON.parse(decks);
    return {[key]: decks[key]}
};

export const addCardToDeck = async (key, {question, answer}) => {
    let Decks = await AsyncStorage.getItem(STORAGE_KEY);
    Decks = JSON.parse(Decks);
    Decks[key].questions.push({question, answer});
    await AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify(Decks))
};