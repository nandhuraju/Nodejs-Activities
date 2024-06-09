const questions = [
    {
        question: "What is the capital of France?",
        answers: ["Paris", "London", "Berlin", "Madrid"],
        correctAnswer: 0
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: ["Earth", "Mars", "Jupiter", "Saturn"],
        correctAnswer: 1
    },
    {
        question: "What is the largest ocean on Earth?",
        answers: ["Atlantic", "Indian", "Arctic", "Pacific"],
        correctAnswer: 3
    }
];

let currentQuestionIndex = 0;
let userAnswers = JSON.parse(localStorage.getItem('userAnswers')) || [];
let score = 0;
let timer;

document.addEventListener('DOMContentLoaded', () => {
    loadQuestion();
    startTimer();
});

function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
        endQuiz();
        return;
    }

    const questionContainer = document.getElementById('question');
    const answersContainer = document.getElementById('answers');
    questionContainer.innerText = questions[currentQuestionIndex].question;
    answersContainer.innerHTML = '';

    questions[currentQuestionIndex].answers.forEach((answer, index) => {
        const answerOption = document.createElement('div');
        answerOption.innerHTML = `
            <input type="radio" name="answer" value="${index}" id="answer${index}">
            <label for="answer${index}">${answer}</label>
        `;
        answersContainer.appendChild(answerOption);
    });

    const savedAnswer = userAnswers[currentQuestionIndex];
    if (savedAnswer !== undefined) {
        document.getElementById(`answer${savedAnswer}`).checked = true;
    }

    resetFeedback();
    resetTimer();
}

function submitAnswer() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (selectedOption) {
        const answerIndex = parseInt(selectedOption.value);
        userAnswers[currentQuestionIndex] = answerIndex;
        localStorage.setItem('userAnswers', JSON.stringify(userAnswers));
        displayFeedback(answerIndex === questions[currentQuestionIndex].correctAnswer);
    } else {
        alert('Please select an answer');
    }
}

function displayFeedback(isCorrect) {
    const feedback = document.getElementById('feedback');
    feedback.innerText = isCorrect ? "Correct!" : `Incorrect. The correct answer is ${questions[currentQuestionIndex].answers[questions[currentQuestionIndex].correctAnswer]}.`;
    feedback.classList.remove('hidden');
    if (isCorrect) score++;
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    clearInterval(timer);
    document.getElementById('quiz-container').classList.add('hidden');
    document.getElementById('score').innerText = `${score} out of ${questions.length}`;
    document.getElementById('score-container').classList.remove('hidden');
}

function startTimer() {
    timer = setTimeout(() => {
        nextQuestion();
        startTimer();
    }, 15000); // 10 seconds per question
}

function resetTimer() {
    clearTimeout(timer);
    startTimer();
}

function resetFeedback() {
    document.getElementById('feedback').classList.add('hidden');
}

function reviewAnswers() {
    const reviewContainer = document.getElementById('review-container');
    reviewContainer.innerHTML = '';
    questions.forEach((question, index) => {
        const userAnswer = userAnswers[index];
        const correctAnswer = question.correctAnswer;
        const reviewDiv = document.createElement('div');
        reviewDiv.innerHTML = `
            <h3>${question.question}</h3>
            <p>Your answer: ${question.answers[userAnswer]} ${userAnswer === correctAnswer ? '(Correct)' : '(Incorrect)'}</p>
            <p>Correct answer: ${question.answers[correctAnswer]}</p>
        `;
        reviewContainer.appendChild(reviewDiv);
    });
    reviewContainer.classList.remove('hidden');
}