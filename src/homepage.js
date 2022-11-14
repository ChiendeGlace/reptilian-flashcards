import { decks, container } from "./index.js";
import { makeQuizpage } from "./quizpage.js";
import { createDeck, createQuestion } from "./functions.js";

const header = document.querySelector('header');
const pageTitle = document.querySelector('h1');
window.addEventListener('resize', function (e) {
        if (this.window.innerWidth < 700 && pageTitle.textContent == 'Reptilian Flashcards') {
            pageTitle.textContent = 'RP'
        } else if (this.window.innerWidth >= 700 && pageTitle.textContent == 'RP') {
            pageTitle.textContent = 'Reptilian Flashcards'
        }
});


// displaying decks on the homepage

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

        const toHomepage = (e) => {
            header.removeChild(toHomepageButton);
            header.appendChild(addDeckBtn);
            homepage.removeChild(deckManage);
            homepageTitle.textContent = 'Decks'
            homepageDeckBox.textContent = '';
            container.appendChild(makeHomepage());
        };

        const toHomepageButton = document.createElement('button');
        toHomepageButton.classList.add('btn');
        toHomepageButton.textContent = 'To deck selection';
        toHomepageButton.addEventListener('click', toHomepage);

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

        const questionList = document.createElement('div');
        const questionInfo = document.createElement('h3');
        questionInfo.textContent = 'Looks like you may wanna add more questions';
        questionList.classList.add('question-list');
        const renderQuestions = () => {
            if (decks[i].questions.length == 0) {
                questionList.appendChild(questionInfo);
            }
            for (let j = 0; j < decks[i].questions.length; j++) {
                const questionBox = document.createElement('div');
                const questionImg = document.createElement('img');
                questionImg.src = decks[i].questions[j].source;
                const questionSentence = document.createElement('p');
                questionSentence.textContent = decks[i].questions[j].sentence;
                const questionCorrect = document.createElement('p');
                questionCorrect.textContent = decks[i].questions[j].correct;
                const questionIncorrect = document.createElement('p');
                questionIncorrect.textContent = decks[i].questions[j].incorrect;
                const deleteBtn = document.createElement('button');
                const buttonDiv = document.createElement('div');
                buttonDiv.appendChild(deleteBtn);
                deleteBtn.textContent = 'Remove';
                deleteBtn.classList.add('btn');
                questionBox.append(questionImg, questionSentence, questionCorrect, questionIncorrect);
                questionBox.classList.add('question-box');
                questionList.append(questionBox, deleteBtn);

                const deleteQuestion = (e) => {
                    decks[i].questions.splice(j, 1);
                    questionList.textContent = '';
                    renderQuestions();
                }

                deleteBtn.addEventListener('click', deleteQuestion);
            }
        }
        renderQuestions();
        
        const questionAdderDiv = document.createElement('div');
        const questionAdderForm = document.createElement('form');
        questionAdderDiv.classList.add('question-adder');
        
        const imageDiv = document.createElement('div');
        const imageLabel = document.createElement('h3');
        imageLabel.textContent = 'Image (not required)';
        const imageInput1 = document.createElement('input');
        imageInput1.type = 'url';
        imageInput1.pattern="https://.*"
        imageInput1.placeholder="https://example.jpg";
        const imageInput2 = document.createElement('input');
        imageInput2.type = 'file';
        imageInput2.accept = ".png, .jpg, .jpeg";
        imageDiv.append(imageLabel, imageInput1, imageInput2);

        const sentenceDiv = document.createElement('div');
        const sentenceLabel = document.createElement('h3');
        sentenceLabel.textContent = 'Sentence (include [...] for the answer!)';
        const sentenceInput = document.createElement('input');
        sentenceInput.minLength = '5';
        sentenceInput.pattern = ".*\\[\\.\\.\\.\\].*";
        sentenceInput.required = true;
        sentenceInput.title = 'Include [...]';
        sentenceInput.classList.add('question-input');
        sentenceInput.placeholder = "She [...] her homework yesterday";
        sentenceDiv.append(sentenceLabel ,sentenceInput);
        const correctDiv = document.createElement('div');
        const correctLabel = document.createElement('h3');
        correctLabel.textContent = 'Correct answer';
        const correctInput = document.createElement('input');
        correctInput.minLength = '1';
        correctInput.required = true;
        correctInput.classList.add('question-input');
        correctInput.placeholder = 'did';
        correctDiv.append(correctLabel, correctInput);

        const incorrectDiv = document.createElement('div');
        const incorrectLabel = document.createElement('h3');
        incorrectLabel.textContent = 'Incorrect answer';
        const incorrectInput = document.createElement('input');
        incorrectInput.minLength = '1';
        incorrectInput.classList.add('question-input');
        incorrectInput.required = true;
        incorrectInput.placeholder = 'made';
        incorrectDiv.append(incorrectLabel, incorrectInput);

        const questionAdderBtn = document.createElement('button');
        questionAdderBtn.textContent = 'Add question';
        questionAdderBtn.classList.add('btn');

        const questionAdded = document.createElement('div');
        const questionAddedText = document.createElement('h3');
        questionAddedText.textContent = 'Question successfully added';
        questionAdded.appendChild(questionAddedText);

        questionAdderForm.append(imageDiv, sentenceDiv, correctDiv, incorrectDiv, questionAdderBtn);
        questionAdderDiv.appendChild(questionAdderForm);

        const deleteDeck = (e) => {
            e.preventDefault();
            if (confirmationInput.value == homepageTitle.textContent) {
                decks.splice(i, 1);
                homepage.removeChild(deckManage);
                homepageTitle.textContent = 'Decks';
                homepageDeckBox.textContent = '';
                container.appendChild(makeHomepage());
                header.removeChild(toHomepageButton);
                header.appendChild(addDeckBtn);
            }
        }

        const pushQuestion = (e) => {
            e.preventDefault();
            deckManage.removeChild(questionAdderDiv)
            deckManage.appendChild(questionAdded);
            setTimeout(() => {
                deckManage.removeChild(questionAdded);
                deckManage.appendChild(questionAdderDiv)
            }, 1500);
            const addQuestionSentence = sentenceInput.value;
            const addQuestionCorrect = correctInput.value;
            const addQuestionIncorrect = incorrectInput.value;
            let addQuestionImage;
            let newQuestion;
            if (imageInput1.value || imageInput2.value) {
                if (!imageInput1.value == '') {
                    addQuestionImage = imageInput1.value;
                } else {
                    addQuestionImage = inputSource;
                }
                newQuestion = createQuestion(addQuestionImage, addQuestionSentence, addQuestionCorrect, addQuestionIncorrect);  
            } else {
                newQuestion = createQuestion('https://imgs.search.brave.com/7t2F7rS7ojVGj4IH3AawGA0rCH8vcDIAvflNBQNyz4A/rs:fit:736:714:1/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vNzM2/eC82YS9lYy9mMC82/YWVjZjBhODc2ODJk/ZTQyYjlhM2M4YTQ0/Y2MwMTNkNS5qcGc', addQuestionSentence, addQuestionCorrect, addQuestionIncorrect);  
            }
            decks[i].questions.push(newQuestion);
            incorrectInput.value = '';
            correctInput.value = '';
            sentenceInput.value = '';
        }

        const removeDeckForm = (e) => {
            deckManage.removeChild(deckQuestionAdd);
            deckManage.removeChild(deckQuestionRemove);
            deckManage.removeChild(deckDeckRemove);
            deckManage.appendChild(confirmationBox);

            confirmationForm.addEventListener('submit', deleteDeck);
        };

        const displayQuestionRemover = (e) => {
            deckManage.removeChild(deckQuestionAdd);
            deckManage.removeChild(deckQuestionRemove);
            deckManage.removeChild(deckDeckRemove);
            deckManage.appendChild(questionList);
        };
        
        //

        // question adder
        const displayQuestionAddForm = (e) => {
            deckManage.removeChild(deckQuestionAdd);
            deckManage.removeChild(deckQuestionRemove);
            deckManage.removeChild(deckDeckRemove);
            deckManage.appendChild(questionAdderDiv);

            questionAdderForm.addEventListener('submit', pushQuestion);
        } ;

        let inputSource;
        imageInput2.addEventListener('change', function (e) {
            const reader = new FileReader();
            reader.onload = function () {
            inputSource = reader.result;
            console.log(inputSource);
            }
            reader.readAsDataURL(imageInput2.files[0]);
        }, false);
        //
        //
        deckQuestionAdd.addEventListener('click', displayQuestionAddForm);
        deckQuestionRemove.addEventListener('click', displayQuestionRemover);
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
