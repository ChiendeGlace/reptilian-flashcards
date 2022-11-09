import { container, decks } from "./index.js";
import { returnButton, makeHomepage, header } from "./homepage.js";


export const makeQuizpage = (deckIndex) => {

    const quizpage = document.createElement('div');
    quizpage.classList.add('quizpage')
    const quizBox = document.createElement('div');
    quizBox.classList.add('quiz-box');
    const quizPageTitle = document.createElement('h2');
    quizPageTitle.textContent = decks[deckIndex].deckName;
    quizpage.appendChild(quizPageTitle);
    
    const questionSentence = document.createElement('p');

    let deckCopy = [...decks[deckIndex].questions];

    let result;
    let index;

    const displayQuestion = (i) => {

        const question = document.createElement('div');
        question.classList.add('question-box');

        const questionImg = document.createElement('img');
        questionImg.src = deckCopy[i].source;

        questionSentence.textContent = deckCopy[i].sentence;

        const correctBox = document.createElement('div');
        correctBox.classList.add('box');
        const correctSquare = document.createElement('div');
        correctSquare.classList.add('square');

        const correctText = document.createElement('p');
        correctText.textContent = deckCopy[i].correct;
        
        const incorrectBox = document.createElement('div');
        incorrectBox.classList.add('box');
        const incorrectSquare = document.createElement('div');
        incorrectSquare.classList.add('square');

        const incorrectText = document.createElement('p');
        incorrectText.textContent = deckCopy[i].incorrect;


        const boxes = document.createElement('div');
        boxes.classList.add('boxes-flex');
        correctBox.append(correctSquare, correctText);
        incorrectBox.append(incorrectSquare, incorrectText);

        if ((Math.random())*100 > 50) {
            boxes.append(incorrectBox, correctBox);
        } else {
            boxes.append(correctBox, incorrectBox);
        }
        question.append(questionImg, questionSentence, boxes);
        quizBox.appendChild(question);

        const showNegative = (e) => {
            incorrectSquare.textContent = 'X';
            incorrectSquare.style.color = '#ef4444';
            incorrectText.style.color = '#ef4444';
            result = 'negative';
            questionSentence.textContent = questionSentence.textContent.replace('[...]', correctText.textContent);
            incorrectBox.removeEventListener('click', showNegative);
            correctBox.removeEventListener('click', showPositive);
        };
        const showPositive = (e) => {
            correctSquare.textContent = 'X';
            correctText.style.color = '#22c55e';
            correctSquare.style.color = '#22c55e';
            result = 'positive';
            questionSentence.textContent = questionSentence.textContent.replace('[...]', correctText.textContent);
            incorrectBox.removeEventListener('click', showNegative);
            correctBox.removeEventListener('click', showPositive);
        };
        incorrectBox.addEventListener('click', showNegative);
        correctBox.addEventListener('click', showPositive);
    };

    const getRandomQuestion = () => {
        let randomArray = [];
        for (let i = 0; i < decks[deckIndex].questions.length; i++) {
            randomArray.push(i);
        }
        index = randomArray[Math.floor(Math.random() * deckCopy.length)];
        return index;
      };
    displayQuestion(getRandomQuestion());

    const buttonDiv = document.createElement('div');
    const questionBtn = document.createElement('button');
    questionBtn.classList.add('btn');
    questionBtn.textContent = 'Next question';

    const finishQuiz = (e) => {
        if (result == 'positive') {
            buttonDiv.removeChild(questionBtn);
            quizBox.textContent = '';
            const congrats = document.createElement('h2');
            congrats.textContent = `Congratulations on finishing the ${decks[deckIndex].deckName}!`;
            quizBox.appendChild(congrats);
        } else {
            quizBox.textContent = '';
            displayQuestion(0);
        }

    }

    const popUp = document.createElement('div');
    popUp.classList.add('pop-up');
    const popUpText = document.createElement('h3');
    popUpText.textContent = 'An answer is required to continue!';
    const popUpBtn = document.createElement('button');
    popUpBtn.textContent = 'Understood';
    popUpBtn.classList.add('btn');
    popUp.append(popUpText, popUpBtn);

    const goBack = (e) => {
        quizBox.classList.remove('opacity'); 
        buttonDiv.removeChild(popUp);
        buttonDiv.appendChild(questionBtn);
    }

    const changeQuestion = (e) => {
        if (questionSentence.textContent.includes('[...]')) {
            quizBox.classList.add('opacity');
            buttonDiv.appendChild(popUp);
            buttonDiv.removeChild(questionBtn);

            popUpBtn.addEventListener('click', goBack);
            
            
        } else {
            quizBox.textContent = '';
            if (result == 'positive') {
                deckCopy.splice(index, 1);
            }
            if (deckCopy.length == 1) {
                questionBtn.textContent = 'Finish quiz';
                questionBtn.removeEventListener('click', changeQuestion);
                questionBtn.addEventListener('click', finishQuiz);
            }
            displayQuestion(getRandomQuestion()); 
        }
    };

    questionBtn.addEventListener('click', changeQuestion);

    buttonDiv.appendChild(questionBtn);
    quizpage.append(quizBox, buttonDiv);
    return quizpage
};

