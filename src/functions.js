import { decks } from "./index.js";

export const createDeck = (deckName) => {
    const questions = [];
    return { deckName, questions };
};

export const createQuestion = (source, sentence, correct, incorrect) => {
    return {source, sentence, correct, incorrect}
};




