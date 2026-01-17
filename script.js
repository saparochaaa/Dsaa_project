/* =========================
   THEME SWITCHING (SAFE)
   ========================= */
const themeMenu = document.getElementById("themeMenu");
const heroSection = document.querySelector(".hero");

if (themeMenu) {
  themeMenu.addEventListener("change", function () {
    document.body.classList.remove("cute-cat", "cool-cat");

    if (this.value === "cute") {
      document.body.classList.add("cute-cat");
      if (heroSection) {
        heroSection.style.backgroundImage =
          "linear-gradient(rgba(0,0,0,.35), rgba(0,0,0,.35)), url('CutieCat.png')";
      }
    } else if (this.value === "cool") {
      document.body.classList.add("cool-cat");
      if (heroSection) {
        heroSection.style.backgroundImage =
          "linear-gradient(rgba(40,20,10,.65), rgba(40,20,10,.65)), url('CoolCutieCat.png')";
      }
    } else {
      if (heroSection) {
        heroSection.style.backgroundImage =
          "linear-gradient(rgba(0,0,0,.55), rgba(0,0,0,.55)), url('https://images.unsplash.com/photo-1515879218367-8466d910aaa4')";
      }
    }
  });
}

/* =========================
   TRY-IT SANDBOX (SAFE)
   ========================= */
const runBtns = document.querySelectorAll(".run-example");

runBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const card = btn.previousElementSibling;
    if (!card) return;

    const textarea = card.querySelector("textarea");
    const output = btn.nextElementSibling;
    if (!textarea || !output) return;

    output.textContent = "";

    const logs = [];
    const originalLog = console.log;

    try {
      console.log = (...args) => {
        logs.push(
          args.map(a => {
            if (a instanceof Set) return `{${[...a].join(", ")}}`;
            if (Array.isArray(a)) return `[${a.join(", ")}]`;
            if (typeof a === "object") return JSON.stringify(a, null, 2);
            return a;
          }).join(" ")
        );
      };

      eval(textarea.value);
      output.textContent = logs.join("\n") || "Code executed successfully.";
    } catch (err) {
      output.textContent = err.message;
    } finally {
      console.log = originalLog;
    }
  });
});

/* =========================
   QUIZ LOGIC (SAFE & FIXED)
   ========================= */
const quizCard = document.getElementById("quizCard");
const questionText = document.getElementById("questionText");
const choicesContainer = document.getElementById("choices");
const feedback = document.getElementById("feedback");
const nextBtn = document.getElementById("nextBtn");
const quizResult = document.getElementById("quizResult");

if (
  quizCard &&
  questionText &&
  choicesContainer &&
  feedback &&
  nextBtn &&
  quizResult
) {

  const quizQuestions = [
    {
      question: "Which of the following is true about a JavaScript Set?",
      choices: [
        "Sets can have duplicate elements.",
        "Sets store elements in insertion order.",
        "Sets only store unique values.",
        "Sets are indexed like arrays."
      ],
      answer: 2
    },
    {
      question:
        "What will be the output?\nconst s = new Set([1,1,2,3]);\nconsole.log(s.size);",
      choices: ["4", "3", "2", "1"],
      answer: 1
    }
  ];

  let currentQuestion = 0;
  let score = 0;

  function loadQuestion() {
    const q = quizQuestions[currentQuestion];
    questionText.textContent = q.question;
    choicesContainer.innerHTML = "";
    feedback.textContent = "";
    nextBtn.style.display = "none";

    q.choices.forEach((choice, i) => {
      const div = document.createElement("div");
      div.className = "quiz-option";
      div.textContent = choice;
      div.addEventListener("click", () => checkAnswer(i));
      choicesContainer.appendChild(div);
    });
  }

  function checkAnswer(choiceIndex) {
    const correctIndex = quizQuestions[currentQuestion].answer;

    if (choiceIndex === correctIndex) {
      feedback.textContent = "Correct!";
      score++;
    } else {
      feedback.textContent =
        "Incorrect. Correct answer: " +
        quizQuestions[currentQuestion].choices[correctIndex];
    }

    nextBtn.style.display = "inline-block";
  }

  nextBtn.addEventListener("click", () => {
    currentQuestion++;
    if (currentQuestion < quizQuestions.length) {
      loadQuestion();
    } else {
      quizCard.style.display = "none";
      nextBtn.style.display = "none";
      quizResult.textContent = `You scored ${score} out of ${quizQuestions.length}!`;
    }
  });

  loadQuestion();
}
