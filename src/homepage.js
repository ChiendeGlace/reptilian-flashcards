import { decks, container } from "./index.js";
import { makeQuizpage, quizpage } from "./quizpage.js";

const header = document.querySelector('header');
const addDeckBtn = document.createElement('button');
addDeckBtn.textContent = 'Create a new deck';
addDeckBtn.classList.add('btn');
header.appendChild(addDeckBtn);

export const makeHomepage = () => {

    const returnButton = document.createElement('button');
    returnButton.textContent = 'To deck selection';
    returnButton.classList.add('btn');

    const homepage = document.createElement('div');
    homepage.classList.add('homepage');
    
    const homepageTitle = document.createElement('h2');
    homepageTitle.textContent = 'Decks'
    
    const homepageDeckBox = document.createElement('div');

    (function () {
        for (let i = 0; i < decks.length; i++) {
            const deckBox = document.createElement('div');
            deckBox.classList.add('deck-box');
            const deckBoxTitle = document.createElement('h3');
            deckBoxTitle.textContent = decks[i].deckName;
            const deckBoxBtn = document.createElement('button');
            const buttons = document.createElement('div');
            deckBoxBtn.textContent = 'Study now';
            deckBoxBtn.classList.add('btn');
            const questionBtn = document.createElement('button');
            questionBtn.textContent = 'Manage deck';
            questionBtn.classList.add('btn');

            buttons.append(deckBoxBtn, questionBtn);
            deckBox.append(deckBoxTitle, buttons);
            homepageDeckBox.appendChild(deckBox);

            const displayDeck = (e) => {
                container.textContent = '';
                container.appendChild(makeQuizpage(i));
                header.removeChild(addDeckBtn);
                header.appendChild(returnButton);

                const eraser = (e) => {
                    container.textContent = '';
                    container.appendChild(makeHomepage());
                    header.removeChild(returnButton);
                    header.appendChild(addDeckBtn);
                };

                returnButton.addEventListener('click', eraser);
            }

        

            deckBoxBtn.addEventListener('click', displayDeck);
        }
        
    })();

    homepage.append(homepageTitle, homepageDeckBox);
    return homepage;
}


