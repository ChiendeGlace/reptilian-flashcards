import { makeHomepage } from "./homepage.js";
import { createDeck, createQuestion } from "./functions.js";
import './scss/main.scss';


export const container = document.querySelector('#container');
export const decks = [];

const prepositionsDeck = createDeck('Prepositions Quiz');
const phrasalVerbs = createDeck('Phrasal Verbs Quiz');

decks.push(prepositionsDeck);
decks.push(phrasalVerbs);

const question1 = createQuestion('https://i.postimg.cc/gkYkK7VR/pizza1.jpg', `We often have a short holiday [...] Christmas`, 'at', 'in');
const question2 = createQuestion('https://i.postimg.cc/gkYkK7VR/pizza1.jpg', `She likes to spend her holidays [...] the seaside`, 'at', 'by');
const question3 = createQuestion('https://i.postimg.cc/gkYkK7VR/pizza1.jpg', `We were [...] the races`, 'at', 'in');
prepositionsDeck.questions.push(question1);
prepositionsDeck.questions.push(question2);
prepositionsDeck.questions.push(question3);


const question4 = createQuestion('https://i.postimg.cc/gkYkK7VR/pizza1.jpg', `He may [...] on his way home.`, 'drop in', 'make in');
const question5 = createQuestion('https://i.postimg.cc/gkYkK7VR/pizza1.jpg', `She needs to [...] of her brother. He's freaking annoying!`, 'get rid', 'get allong');
const question6 = createQuestion('https://i.postimg.cc/gkYkK7VR/pizza1.jpg', `The cops asked us to [...]. We were driving too fast!`, 'pull over', 'drop up');
phrasalVerbs.questions.push(question4);
phrasalVerbs.questions.push(question5);
phrasalVerbs.questions.push(question6);



container.appendChild(makeHomepage());


