import { container, decks } from "./index.js";

export const quizpage = document.createElement('div');

export const makeQuizpage = () => {
    const quizBox = document.createElement('div');
    const quizPageTitle = document.createElement('h2');
    quizPageTitle.textContent = decks[0].deckName;
    quizBox.appendChild(quizPageTitle);
    
    const questionSentence = document.createElement('p');

    const displayQuestion = (i) => {
        const question = document.createElement('div');

        const questionImg = document.createElement('img');
        questionImg.src = decks[0].questions[i].source;

        questionSentence.textContent = decks[0].questions[i].sentence;
        
        const correctBox = document.createElement('div');
        const correctSquare = document.createElement('div');
        correctSquare.classList.add('box');
        
        correctSquare.style.width = '50px';
        correctSquare.style.height = '50px';
        correctSquare.style.backgroundColor = 'gray';

        const correctText = document.createElement('p');
        correctText.textContent = decks[0].questions[i].correct;
        
        const incorrectBox = document.createElement('div');
        const incorrectSquare = document.createElement('div');
        incorrectSquare.classList.add('box');

        incorrectSquare.style.width = '50px';
        incorrectSquare.style.height = '50px';
        incorrectSquare.style.backgroundColor = 'gray';

        const incorrectText = document.createElement('p');
        incorrectText.textContent = decks[0].questions[i].incorrect;

        correctBox.append(correctSquare, correctText);
        incorrectBox.append(incorrectSquare, incorrectText);

        if ((Math.random())*100 > 50) {
            question.append(questionImg, questionSentence, correctBox, incorrectBox);
        } else {
            question.append(questionImg, questionSentence, incorrectBox, correctBox);
        }
        quizBox.appendChild(question);

        const showNegative = (e) => {
            incorrectSquare.style.backgroundColor = 'red';
            questionSentence.textContent = questionSentence.textContent.replace('[]', correctText.textContent);
            incorrectBox.removeEventListener('click', showNegative);
            correctBox.removeEventListener('click', showPositive);
        };
        const showPositive = (e) => {
            correctSquare.style.backgroundColor = 'green';
            questionSentence.textContent = questionSentence.textContent.replace('[]', correctText.textContent);
            incorrectBox.removeEventListener('click', showNegative);
            correctBox.removeEventListener('click', showPositive);
        };
        incorrectBox.addEventListener('click', showNegative);
        correctBox.addEventListener('click', showPositive);
    };
    const getRandomQuestion = () => {
        let randomArray = [];
        for (let i = 0; i < decks[0].questions.length; i++) {
            randomArray.push(i);
        }
        console.log(randomArray);
        return randomArray[Math.floor(Math.random() * decks[0].questions.length)]
      };
    displayQuestion(getRandomQuestion());

    const questionBtn = document.createElement('button');
    questionBtn.textContent = 'Next question';
    const changeQuestion = (e) => {
        if (questionSentence.textContent.includes('[]')) {
            alert('Answer the question');
        } else {
            quizBox.textContent = '';
            displayQuestion(getRandomQuestion()); 
        }
    };
    questionBtn.addEventListener('click', changeQuestion);


    quizpage.append(quizBox, questionBtn);
    return quizpage
};