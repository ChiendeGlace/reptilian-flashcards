import { decks, container } from "./index.js";
import { makeQuizpage } from "./quizpage.js";
import { createDeck } from "./functions.js";

const header = document.querySelector('header');


// displaying decks on the homepage

const toHomepageButton = document.createElement('button');
toHomepageButton.classList.add('btn');
toHomepageButton.textContent = 'To deck selection';

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

        // question adder 
        const displayQuestionAdder = (e) => {
            homepage.appendChild(deckManage); 
            homepage.removeChild(homepageDeckBox);
            homepageTitle.textContent = decks[i].deckName;

            header.removeChild(addDeckBtn);
            header.appendChild(toHomepageButton); 
        };
        //

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

        const confirmationBox = document.createElement('div');
        const confirmationForm = document.createElement('form');
        const confirmationText = document.createElement('h3');
        const confirmationInput = document.createElement('input');
        const confirmationButton = document.createElement('button');

        // question elements
        const deckManage = document.createElement('div');
        const deckQuestionAdd = document.createElement('button');
        const deckQuestionRemove = document.createElement('button');
        const deckDeckRemove = document.createElement('button');

        deckQuestionAdd.textContent = 'Add questions';
        deckQuestionRemove.textContent = 'Remove questions';
        deckDeckRemove.textContent = 'Delete deck';

        deckQuestionAdd.classList.add('btn');
        deckQuestionRemove.classList.add('btn');
        deckDeckRemove.classList.add('btn');

        deckManage.classList.add('deck-manage');
        deckManage.append(deckQuestionAdd, deckQuestionRemove, deckDeckRemove);
        //

        // remove deck 

        confirmationText.textContent = `Are you sure you want to delete ${decks[i].deckName}? 
        Please type ${decks[i].deckName} in the input below if you want to continue.`
        confirmationButton.textContent = 'Delete this deck';
        confirmationInput.type = 'text';
        confirmationInput.minLength='5';
        confirmationInput.maxLength='50';
        confirmationInput.placeholder = `${decks[i].deckName}`
        confirmationInput.required = true;

        confirmationBox.classList.add('confirmation-box');
        confirmationButton.classList.add('btn');

        confirmationForm.append(confirmationInput, confirmationButton);
        confirmationBox.append(confirmationText, confirmationForm);

        const deleteDeck = (e) => {
            e.preventDefault();
            if (confirmationInput.value == homepageTitle.textContent) {
                decks.splice(i, 1);
                homepage.removeChild(deckManage);
                homepage.appendChild(homepageDeckBox);
                homepageTitle.textContent = 'Decks';
            }
        }

        const removeDeckForm = (e) => {
            deckManage.removeChild(deckQuestionAdd);
            deckManage.removeChild(deckQuestionRemove);
            deckManage.removeChild(deckDeckRemove);
            deckManage.appendChild(confirmationBox);

            confirmationForm.addEventListener('submit', deleteDeck);
        };
        //
        //
        deckDeckRemove.addEventListener('click', removeDeckForm);
    

        questionBtn.addEventListener('click', displayQuestionAdder);
        deckBoxBtn.addEventListener('click', displayDeck);
    }  
    
};
// 

// Deck adder elements

const makeDeck = (e) => { 
    e.preventDefault();
    if (!formDeckInput.value == '') {
        const title = formDeckInput.value;
        const newDeck = createDeck(title);
        decks.push(newDeck);
        renderDecks(decks.length - 1);
    }
    goBack();
}

// deck adder functions
const displayForm = (e) => {
    homepage.appendChild(deckForm);
    homepage.removeChild(homepageDeckBox);
    homepageTitle.textContent = 'Add a new deck';

    quitBtn.addEventListener('click', goBack);

    addDeckBtn.removeEventListener('click', displayForm);
}

const goBack = (e) => {
    homepage.removeChild(deckForm);
    homepage.appendChild(homepageDeckBox);
    homepageTitle.textContent = 'Decks';
    addDeckBtn.addEventListener('click', displayForm);
}
//

const form = document.createElement('form');
const addDeckBtn = document.createElement('button');
const quitBtn = document.createElement('button');
const formDeckInput = document.createElement('input');
const deckSubmitBtn = document.createElement('button');
const formDeckName = document.createElement('h3');
const deckForm = document.createElement('div');
const btnWrapper = document.createElement('div');

quitBtn.textContent = 'Go back';
deckSubmitBtn.textContent = 'Ok';
formDeckName.textContent = 'Deck name:'
addDeckBtn.textContent = 'Create a new deck';

addDeckBtn.classList.add('btn');
deckForm.classList.add('deck-form');
quitBtn.classList.add('btn');
form.classList.add('form');
deckSubmitBtn.classList.add('btn');
btnWrapper.classList.add('btn-wrapper');

formDeckInput.type = 'text';
formDeckInput.minLength='5';
formDeckInput.maxLength='50';
formDeckInput.placeholder = 'Cool deck'
formDeckInput.required = true;
deckSubmitBtn.type = 'submit';

header.appendChild(addDeckBtn);
deckForm.append(formDeckName, form);
form.append(formDeckInput, btnWrapper);
btnWrapper.append(deckSubmitBtn, quitBtn);


form.addEventListener('submit', makeDeck);
addDeckBtn.addEventListener('click', displayForm);
//

// homepage elements
const homepage = document.createElement('div');
const returnButton = document.createElement('button');
const homepageTitle = document.createElement('h2');
const homepageDeckBox = document.createElement('div');

returnButton.textContent = 'To deck selection';
homepageTitle.textContent = 'Decks';
returnButton.classList.add('btn');
homepage.classList.add('homepage');

const eraser = (e) => {
    container.textContent = '';
    container.appendChild(homepage);
    header.removeChild(returnButton);
    header.appendChild(addDeckBtn);
};
//

export const makeHomepage = () => {
    renderDecks(0);

    homepage.append(homepageTitle, homepageDeckBox);
    return homepage;
    
}
