import { makeHomepage, homepage } from "./homepage.js";
import { createDeck, createQuestion } from "./functions.js";
import { makeQuizpage, quizpage } from "./quizpage.js";

export const container = document.querySelector('#container');
export const decks = [];

const prepositionsDeck = createDeck('Prepositions Quiz');

decks.push(prepositionsDeck);

const question1 = createQuestion('https://i.postimg.cc/gkYkK7VR/pizza1.jpg', `We often have a short holiday [] Christmas`, 'at', 'in');
const question2 = createQuestion('https://i.postimg.cc/gkYkK7VR/pizza1.jpg', `She likes to spend her holidays []the seaside`, 'at', 'by');
const question3 = createQuestion('https://i.postimg.cc/gkYkK7VR/pizza1.jpg', `We were [] the races`, 'at', 'in');
prepositionsDeck.questions.push(question1);
prepositionsDeck.questions.push(question2);
prepositionsDeck.questions.push(question3);


makeHomepage();
container.appendChild(homepage);


