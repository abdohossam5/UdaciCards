import {AsyncStorage} from 'react-native';
import {getDeckKeyFromTitle} from './helpers'

const STORAGE_KEY = "UDACICARDS";
const initialState = {};

export const getDecks = async () => {
  let Decks = await AsyncStorage.getItem(STORAGE_KEY);
  if(!Decks) Decks = {};
  return JSON.parse(Decks);
};

export const getDeck = async (key) => {
    let Decks = await AsyncStorage.getItem(STORAGE_KEY);
    return (Decks && Decks[key]) || {};
};

export const saveDeckTitle = async (title) => {
    const key = getDeckKeyFromTitle(title);
    await AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
        [key]: {title, questions: []}
    }))
};

export const addCardToDeck = async (key, {question, answer}) => {
    let Decks = await AsyncStorage.getItem(STORAGE_KEY);
    Decks = JSON.parse(Decks);
    Decks[key].questions.push({question, answer});
    await AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify(Decks))
};