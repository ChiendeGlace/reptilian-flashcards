import { decks, container } from "./index.js";
import { makeQuizpage, quizpage } from "./quizpage.js";

const header = document.querySelector('header');

export const homepage = document.createElement('div');
export const makeHomepage = () => {
    makeQuizpage();
    
    const homepageTitle = document.createElement('h2');
    homepageTitle.textContent = 'Decks'
    
    const homepageDeckBox = document.createElement('div');

    (function () {
        for (let i = 0; i < decks.length; i++) {
            const deckBox = document.createElement('div');
            const deckBoxTitle = document.createElement('h3');
            deckBoxTitle.textContent = decks[i].deckName;
            const deckBoxBtn = document.createElement('button');
            deckBoxBtn.textContent = 'Play the deck';

            deckBox.append(deckBoxTitle, deckBoxBtn);
            homepageDeckBox.appendChild(deckBox);

            const displayDeck = (e) => {
                container.removeChild(homepage);
                container.appendChild(quizpage);
                const returnButton = document.createElement('button');
                returnButton.textContent = 'To deck selection';
                header.appendChild(returnButton);

                const restart = (e) => {
                    container.appendChild(homepage);
                    container.removeChild(quizpage);
                    header.removeChild(returnButton);
                };

                returnButton.addEventListener('click', restart);
            }

            deckBoxBtn.addEventListener('click', displayDeck);
        }
    })();

    homepage.append(homepageTitle, homepageDeckBox);
    return homepage;
}


