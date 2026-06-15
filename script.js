// DOM Elements

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");

const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");

const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");

const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");

const resultMessage = document.getElementById("result-message");
const progressBar = document.getElementById("progress");

// Quiz Data

const quizQuestions = [
  {
    question: "What is the capital of India?",
    answers: [
      { text: "Mumbai", isCorrect: false },
      { text: "New Delhi", isCorrect: true },
      { text: "Kolkata", isCorrect: false },
      { text: "Chennai", isCorrect: false }
    ]
  },
  {
    question: "Which is the national animal of India?",
    answers: [
      { text: "Lion", isCorrect: false },
      { text: "Elephant", isCorrect: false },
      { text: "Tiger", isCorrect: true },
      { text: "Leopard", isCorrect: false }
    ]
  },
  {
    question: "Which river is known as the Ganga of South India?",
    answers: [
      { text: "Godavari", isCorrect: true },
      { text: "Krishna", isCorrect: false },
      { text: "Kaveri", isCorrect: false },
      { text: "Narmada", isCorrect: false }
    ]
  },
  {
    question: "Who is known as the Father of the Nation in India?",
    answers: [
      { text: "Jawaharlal Nehru", isCorrect: false },
      { text: "Subhas Chandra Bose", isCorrect: false },
      { text: "Mahatma Gandhi", isCorrect: true },
      { text: "Sardar Patel", isCorrect: false }
    ]
  },
  {
    question: "How many states are there in India?",
    answers: [
      { text: "28", isCorrect: true },
      { text: "29", isCorrect: false },
      { text: "30", isCorrect: false },
      { text: "27", isCorrect: false }
    ]
  },
  {
    question: "Which is the national bird of India?",
    answers: [
      { text: "Peacock", isCorrect: true },
      { text: "Parrot", isCorrect: false },
      { text: "Eagle", isCorrect: false },
      { text: "Sparrow", isCorrect: false }
    ]
  },
  {
    question: "Which is the largest state in India by area?",
    answers: [
      { text: "Rajasthan", isCorrect: true },
      { text: "Maharashtra", isCorrect: false },
      { text: "Uttar Pradesh", isCorrect: false },
      { text: "Madhya Pradesh", isCorrect: false }
    ]
  },
  {
    question: "Which city is known as the Silicon Valley of India?",
    answers: [
      { text: "Hyderabad", isCorrect: false },
      { text: "Pune", isCorrect: false },
      { text: "Bengaluru", isCorrect: true },
      { text: "Chennai", isCorrect: false }
    ]
  },
  {
    question: "What is the currency of India?",
    answers: [
      { text: "Dollar", isCorrect: false },
      { text: "Yen", isCorrect: false },
      { text: "Rupee", isCorrect: true },
      { text: "Taka", isCorrect: false }
    ]
  },
  {
    question: "Which is the highest mountain peak in India?",
    answers: [
      { text: "Kanchenjunga", isCorrect: true },
      { text: "Nanda Devi", isCorrect: false },
      { text: "Anamudi", isCorrect: false },
      { text: "K2", isCorrect: false }
    ]
  }
];

let currentQuestionIndex = 0;
let score = 0;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

startBtn.addEventListener("click", startQuiz);
restartBtn.addEventListener("click", restartQuiz);

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;

  scoreSpan.textContent = score;

  startScreen.classList.remove("active");
  resultScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}

function showQuestion() {
  const question = quizQuestions[currentQuestionIndex];

  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  progressBar.style.width =
    ((currentQuestionIndex + 1) / quizQuestions.length) * 100 + "%";

  questionText.textContent = question.question;

  answersContainer.innerHTML = "";

  question.answers.forEach(answer => {
    const btn = document.createElement("button");

    btn.classList.add("answer-btn");
    btn.textContent = answer.text;

    btn.addEventListener("click", () => selectAnswer(answer.isCorrect, btn));

    answersContainer.appendChild(btn);
  });
}

function selectAnswer(isCorrect, button) {

  const allButtons = document.querySelectorAll(".answer-btn");

  allButtons.forEach(btn => btn.disabled = true);

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
    button.classList.add("correct");
  } else {
    button.classList.add("wrong");
  }

  setTimeout(() => {

    currentQuestionIndex++;

    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResult();
    }

  }, 800);
}

function showResult() {

  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;

  const percentage = (score / quizQuestions.length) * 100;

  if (percentage >= 80) {
    resultMessage.textContent = "Excellent! 🇮🇳";
  } else if (percentage >= 50) {
    resultMessage.textContent = "Good Job!";
  } else {
    resultMessage.textContent = "Keep Learning!";
  }
}

function restartQuiz() {
  startQuiz();
}
