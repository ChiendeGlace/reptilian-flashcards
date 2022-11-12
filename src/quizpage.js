import { decks } from "./index.js";

export const makeQuizpage = (deckIndex) => {

    // no answer pop-up
    const popUp = document.createElement('div');
    const popUpText = document.createElement('h3');
    const popUpBtn = document.createElement('button');
    popUpText.textContent = 'An answer is required to continue!';
    popUpBtn.textContent = 'Understood';
    popUpBtn.classList.add('btn');
    popUp.classList.add('pop-up');
    popUp.append(popUpText, popUpBtn);

    // quizpage body
    const quizpage = document.createElement('div');
    const quizBox = document.createElement('div');
    const quizPageTitle = document.createElement('h2');
    const questionSentence = document.createElement('p');
    const buttonDiv = document.createElement('div');
    const questionBtn = document.createElement('button');
    questionBtn.textContent = 'Next question';
    quizPageTitle.textContent = decks[deckIndex].deckName;
    quizpage.classList.add('quizpage')
    quizBox.classList.add('quiz-box');
    questionBtn.classList.add('btn');
    quizpage.appendChild(quizPageTitle);
    buttonDiv.appendChild(questionBtn);

    const endEarlyBtn = document.createElement('button');
    endEarlyBtn.classList.add('btn');
    endEarlyBtn.textContent = 'Finish Quiz'

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

    if (decks[deckIndex].questions.length == 1) {
        questionBtn.textContent = 'Finish Quiz';
        questionBtn.addEventListener('click', finishQuiz);
    } else {
        questionBtn.addEventListener('click', changeQuestion);
    }

    quizpage.append(quizBox, buttonDiv);
    return quizpage
};

