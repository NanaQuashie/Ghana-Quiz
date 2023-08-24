const questions = [
    {
        question: "How many presidents have Ghana had?",
        answers: [
           { text: "Ten", correct: false},
           { text: "Eleven", correct: true},
           { text: "Twelve", correct: false},
           { text: "Thirteen", correct: false},
        ]
    },

    {
        question: "How many regions are there in Ghana?",
        answers: [
           { text: "Fourteen", correct: false},
           { text: "Fifteen", correct: false},
           { text: "Sixteen", correct: true},
           { text: "Seventeen", correct: false},
        ]
    },

    {
        question: "Which Region in Ghana is the largest?",
        answers: [
           { text: "Brong Ahafo Region", correct: false},
           { text: "Volta Region", correct: false},
           { text: "Northern Region", correct: true},
           { text: "Western Region", correct: false},
        ]
    },

    {
        question: "What is Ghana's capital?",
        answers: [
           { text: "Goaso", correct: false},
           { text: "Cape Coast", correct: false},
           { text: "Koforidua", correct: false},
           { text: "Accra", correct: true},
        ]
    },

    {
        question: "What currency do Ghanaians use?",
        answers: [
           { text: "Ghana Cedi", correct: true},
           { text: "Ghanaian Dollar", correct: false},
           { text: "Ghana Rupee", correct: false},
           { text: "Ghanaian Dinar", correct: false},
        ]
    },

    {
        question: "When did Ghana gain independence?",
        answers: [
           { text: "1957", correct: true},
           { text: "1958", correct: false},
           { text: "1959", correct: false},
           { text: "1960", correct: false},
        ]
    },

    {
        question: "Who was Ghana's first president?",
        answers: [
           { text: "Brigadier Akwasi Afrifa", correct: false},
           { text: "Edward Akufo-Addo", correct: false},
           { text: "Nana Akufo Addo", correct: false},
           { text: "Kwame Nkrumah", correct: true},
        ]
    },

    {
        question: "What is the name of Ghana's presidential residence?",
        answers: [
           { text: "Black Star Square", correct: false},
           { text: "Accra Castle", correct: false},
           { text: "Golden House", correct: false},
           { text: "Jubilee House", correct: true},
        ]
    },

    {
        question: "Kumasi is found in which Ghanaian region?",
        answers: [
           { text: "Ashanti", correct: true},
           { text: "Bono East", correct: false},
           { text: "Bono", correct: false},
           { text: "Northern", correct: false},
        ]
    },

    {
        question: "Which people colonized Ghana?",
        answers: [
           { text: "The French", correct: false},
           { text: "Great Britain", correct: true},
           { text: "The Portugese", correct: false},
           { text: "The Spaniards", correct: false},
        ]
    }

];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of 
    ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

    startQuiz();
