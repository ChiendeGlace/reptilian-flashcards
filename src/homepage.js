import { decks, container } from "./index.js";
import { makeQuizpage, quizpage } from "./quizpage.js";
import { createDeck, createQuestion } from "./functions.js";

const header = document.querySelector('header');
export const addDeckBtn = document.createElement('button');
addDeckBtn.textContent = 'Create a new deck';
addDeckBtn.classList.add('btn');
header.appendChild(addDeckBtn);

const deckForm = document.createElement('div');
deckForm.classList.add('deck-form');


const quitBtn = document.createElement('button');
quitBtn.classList.add('btn');
quitBtn.textContent = 'Go back';



export const makeHomepage = () => {

    const homepage = document.createElement('div');

    const returnButton = document.createElement('button');
    returnButton.textContent = 'To deck selection';
    returnButton.classList.add('btn');

    homepage.classList.add('homepage');
    
    const homepageTitle = document.createElement('h2');
    homepageTitle.textContent = 'Decks'
    
    const homepageDeckBox = document.createElement('div');

    const renderDecks = (y) => {
        for (let i = y; i < decks.length; i++) {
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

            const eraser = (e) => {
                container.textContent = '';
                container.appendChild(makeHomepage());
                header.removeChild(returnButton);
                header.appendChild(addDeckBtn);
            };


            const displayDeck = (e) => {
                    if (decks[i].questions.length == 0) {
                        homepageTitle.textContent = decks[i].deckName;


                        const backToAddQuestions = (e) => {
                            homepage.removeChild(warningBox);
                            homepage.appendChild(homepageDeckBox);
                            header.appendChild(addDeckBtn);
                            header.removeChild(return2Btn);
                            homepageTitle.textContent = 'Decks';
                        }

                        const warningBox = document.createElement('div');
                        warningBox.classList.add('warning-box');
                        const warningBoxText = document.createElement('p');
                        warningBoxText.textContent = 'You may wanna add some questions to continue. To do that go back to deck selection then click on the manage deck button on your deck of choice.';
                        warningBox.appendChild(warningBoxText);

                        homepage.removeChild(homepageDeckBox);
                        homepage.appendChild(warningBox);

                        const return2Btn = document.createElement('button');
                        return2Btn.classList.add('btn');
                        return2Btn.textContent = 'To deck selection';
                        header.removeChild(addDeckBtn);
                        header.appendChild(return2Btn);

                        return2Btn.addEventListener('click', backToAddQuestions);
                    } else {
                        container.textContent = '';
                        container.appendChild(makeQuizpage(i));
                        header.removeChild(addDeckBtn);
                        header.appendChild(returnButton); 
                    }

                returnButton.addEventListener('click', eraser);
            }

        

            deckBoxBtn.addEventListener('click', displayDeck);
        }
        
    };
    renderDecks(0);

    const form = document.createElement('form');
    form.classList.add('form');
    const formDeckInput = document.createElement('input');
    formDeckInput.type = 'text';
    formDeckInput.minLength='5';
    formDeckInput.maxLength='50';
    formDeckInput.placeholder = 'Cool deck'
    formDeckInput.required = true;
    const deckSubmitBtn = document.createElement('button');
    deckSubmitBtn.type = 'submit';
    deckSubmitBtn.textContent = 'Ok';
    deckSubmitBtn.classList.add('btn');
    const formDeckName = document.createElement('h3');
    formDeckName.textContent = 'Deck name:'
    const btnWrapper = document.createElement('div');
    btnWrapper.classList.add('btn-wrapper');
    form.append(formDeckInput, btnWrapper);
    btnWrapper.append(deckSubmitBtn, quitBtn);
    deckForm.append(formDeckName, form);

    const goBack = (e) => {
        homepage.removeChild(deckForm);
        homepage.appendChild(homepageDeckBox);
        homepageTitle.textContent = 'Decks';
        addDeckBtn.addEventListener('click', displayForm);
    }

    const makeDeck = (e) => { 
        if (!formDeckInput.value == '') {
            const title = formDeckInput.value;
            const newDeck = createDeck(title);
            decks.push(newDeck);
            renderDecks(decks.length - 1);
        }
        goBack();
    }

    const displayForm = (e) => {
        homepage.appendChild(deckForm);
        homepage.removeChild(homepageDeckBox);
        homepageTitle.textContent = 'Add a new deck';

        quitBtn.addEventListener('click', goBack);


        addDeckBtn.removeEventListener('click', displayForm);
    }
    
    addDeckBtn.addEventListener('click', displayForm);
    deckSubmitBtn.addEventListener('click', makeDeck);

    
    homepage.append(homepageTitle, homepageDeckBox);
    return homepage;
    
}


