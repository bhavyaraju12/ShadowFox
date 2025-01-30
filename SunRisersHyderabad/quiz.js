const questionContainer = document.getElementById("question-container");
    const questionElement = document.getElementById("question");
    const answerButtons = document.getElementById("answer-buttons");
    const nextButton = document.getElementById("next-btn");
    const restartButton = document.getElementById("restart-btn");
    const resultDiv = document.getElementById("result");

    let shuffledQuestions, currentQuestionIndex, score;

    const questions = [
      {
        question: "Who was the first captain of Sunrisers Hyderabad when the team was formed in 2013?",
        answers: [
          { text: "Kumar Sangakkara", correct: true },
          { text: "Cameron White", correct: false },
          { text: "David Warner", correct: false },
          { text: "Shikhar Dhawan", correct: false },
        ],
      },
      {
        question: "In which year did Sunrisers Hyderabad win their first IPL title?",
        answers: [
          { text: "2013", correct: false },
          { text: "2014", correct: false },
          { text: "2016", correct: true },
          { text: "2018", correct: false },
        ],
      },
      {
        question: "Who holds the record for most runs in a single season for SRH?",
        answers: [
          { text: "Kane Williamson", correct: false },
          { text: "David Warner", correct: true },
          { text: "Shikhar Dhawan", correct: false },
          { text: "Jonny Bairstow", correct: false },
        ],
      },
      {
        question: "Which bowler has taken the most wickets for SRH in IPL history?",
        answers: [
          { text: "Rashid Khan", correct: false },
          { text: "Bhuvneshwar Kumar", correct: true },
          { text: "Dale Steyn", correct: false },
          { text: "Siddarth Kaul", correct: false },
        ],
      },
      {
        question: "Who is the current head coach of Sunrisers Hyderabad (as of 2025)?",
        answers: [
          { text: "Daniel Vettori", correct: true },
          { text: "Tom Moody", correct: false },
          { text: "Trevor Bayliss", correct: false },
          { text: "Brian Lara", correct: false },
        ],
      },
    ];

    startQuiz();

    function startQuiz() {
      score = 0;
      questionContainer.style.display = "flex";
      shuffledQuestions = questions.sort(() => Math.random() - 0.5);
      currentQuestionIndex = 0;
      nextButton.classList.remove("hide");
      restartButton.classList.add("hide");
      resultDiv.classList.add("hide");
      setNextQuestion();
    }

    function setNextQuestion() {
      resetState();
      if (shuffledQuestions.length > currentQuestionIndex) {
        showQuestion(shuffledQuestions[currentQuestionIndex]);
      } else {
        endQuiz();
      }
    }

    function showQuestion(question) {
      questionElement.innerText = question.question;
      question.answers.forEach((answer, index) => {
        const inputGroup = document.createElement("div");
        inputGroup.classList.add("input-group");

        const radio = document.createElement("input");
        radio.type = "radio";
        radio.id = "answer" + index;
        radio.name = "answer";
        radio.value = index;

        const label = document.createElement("label");
        label.htmlFor = "answer" + index;
        label.innerText = answer.text;

        inputGroup.appendChild(radio);
        inputGroup.appendChild(label);
        answerButtons.appendChild(inputGroup);
      });
    }

    function resetState() {
      while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
      }
    }

    nextButton.addEventListener("click", () => {
      const answerIndex = Array.from(
        answerButtons.querySelectorAll("input")
      ).findIndex((radio) => radio.checked);
      if (answerIndex !== -1) {
        if (shuffledQuestions[currentQuestionIndex].answers[answerIndex].correct) {
          score++;
        }
        currentQuestionIndex++;
        if (shuffledQuestions.length > currentQuestionIndex) {
          setNextQuestion();
        } else {
          endQuiz();
        }
      } else {
        alert("Please select an answer.");
      }
    });

    restartButton.addEventListener("click", startQuiz);

    function endQuiz() {
      questionContainer.style.display = "none";
      nextButton.classList.add("hide");
      restartButton.classList.remove("hide");
      resultDiv.classList.remove("hide");
      resultDiv.innerText = `Your final score: ${score} / ${shuffledQuestions.length}`;
    }