// クイズデータ（answer は正解の選択肢のインデックス、0始まり）
const QUESTIONS = [
  {
    question: "日本で一番面積が大きい都道府県はどこ？",
    choices: ["北海道", "岩手県", "長野県", "新潟県"],
    answer: 0,
    explanation: "北海道は日本の総面積の約2割を占めます。"
  },
  {
    question: "水が沸騰する温度は、標準的な気圧のもとで何℃？",
    choices: ["80℃", "90℃", "100℃", "120℃"],
    answer: 2,
    explanation: "1気圧では水は100℃で沸騰します。"
  },
  {
    question: "1年のうち、日本（北半球）で昼が最も長くなる日は？",
    choices: ["春分の日", "夏至", "秋分の日", "冬至"],
    answer: 1,
    explanation: "夏至は昼の時間が1年で最も長い日です。"
  },
  {
    question: "地球上で最も大きな海洋はどれ？",
    choices: ["大西洋", "インド洋", "北極海", "太平洋"],
    answer: 3,
    explanation: "太平洋は地球の表面積の約3分の1を占めます。"
  },
  {
    question: "「光の三原色」に含まれない色はどれ？",
    choices: ["赤", "緑", "青", "黄"],
    answer: 3,
    explanation: "光の三原色は赤・緑・青です。黄は含まれません。"
  }
];

const progressEl = document.getElementById("progress");
const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const scoreEl = document.getElementById("score");
const resultMessageEl = document.getElementById("result-message");
const retryBtn = document.getElementById("retry-btn");

let currentIndex = 0;
let score = 0;

// 現在の問題を表示する
function showQuestion() {
  const q = QUESTIONS[currentIndex];
  progressEl.textContent = `第${currentIndex + 1}問 / 全${QUESTIONS.length}問`;
  questionEl.textContent = q.question;
  feedbackEl.textContent = "";
  feedbackEl.className = "feedback";
  nextBtn.hidden = true;
  nextBtn.textContent = currentIndex === QUESTIONS.length - 1 ? "結果を見る" : "次の問題へ";

  choicesEl.innerHTML = "";
  q.choices.forEach((text, i) => {
    const btn = document.createElement("button");
    btn.className = "choice-btn";
    btn.textContent = text;
    btn.addEventListener("click", () => selectChoice(i));
    choicesEl.appendChild(btn);
  });
}

// 選択肢が選ばれたときの処理
function selectChoice(selected) {
  const q = QUESTIONS[currentIndex];
  const buttons = choicesEl.querySelectorAll(".choice-btn");
  buttons.forEach((btn) => (btn.disabled = true));
  buttons[q.answer].classList.add("correct");

  if (selected === q.answer) {
    score++;
    feedbackEl.textContent = `正解！ ${q.explanation}`;
    feedbackEl.className = "feedback correct";
  } else {
    buttons[selected].classList.add("incorrect");
    feedbackEl.textContent = `不正解… 正解は「${q.choices[q.answer]}」です。${q.explanation}`;
    feedbackEl.className = "feedback incorrect";
  }
  nextBtn.hidden = false;
}

// 結果画面を表示する
function showResult() {
  quizScreen.hidden = true;
  resultScreen.hidden = false;
  scoreEl.textContent = `${QUESTIONS.length}問中${score}問正解`;
  if (score === QUESTIONS.length) {
    resultMessageEl.textContent = "全問正解！すばらしい！";
  } else if (score >= 3) {
    resultMessageEl.textContent = "よくできました！";
  } else {
    resultMessageEl.textContent = "もう少し！もう一度挑戦してみよう。";
  }
}

// 最初からやり直す
function restart() {
  currentIndex = 0;
  score = 0;
  resultScreen.hidden = true;
  quizScreen.hidden = false;
  showQuestion();
}

nextBtn.addEventListener("click", () => {
  currentIndex++;
  if (currentIndex < QUESTIONS.length) {
    showQuestion();
  } else {
    showResult();
  }
});

retryBtn.addEventListener("click", restart);

showQuestion();
