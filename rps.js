let pcMove = "";
let result = "";
let chosenMoves = "";
let resultAnimation = "";
let lang = "";

let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

let isAutoPlaying = false;
let intervalId;

if (document.title === "سنگ کاغذ قیچی") {
  lang = "fa";
}

scoreCounter(lang);

function playGame(userMove) {
  pcMove = Math.random();
  if (pcMove < 1 / 3) {
    pcMove = "✊";
  } else if (pcMove > 1 / 3 && pcMove < 2 / 3) {
    pcMove = "✋";
  } else {
    pcMove = "✌️";
  }

  if (pcMove === userMove) {
    score.ties++;
    lang === "fa" ? (result = "مساوی!") : (result = "It's a Tie!");
    resultAnimation = "tie";
  } else if (
    (pcMove === "✊" && userMove === "✋") ||
    (pcMove === "✋" && userMove === "✌️") ||
    (pcMove === "✌️" && userMove === "✊")
  ) {
    score.wins++;
    lang === "fa" ? (result = "برنده شدی!") : (result = "You Win!");
    resultAnimation = "win";
  } else {
    score.losses++;
    lang === "fa" ? (result = "باختی!") : (result = "You Lose!");
    resultAnimation = "lose";
  }

  localStorage.setItem("score", JSON.stringify(score));

  resultElm = document.querySelector(".js-result");
  whatHappened = document.querySelector(".js-what-happened");
  lang === "fa"
    ? (whatHappened.innerHTML = `کامپیوتر <span class="js-pc-move pc-move"></span> <span class="js-user-move user-move"></span> تو`)
    : (whatHappened.innerHTML = `You <span class="js-user-move user-move"></span> <span class="js-pc-move pc-move"></span> PC`);
  chosenMovesElm = document.querySelector(".js-who-picked-what");
  userMoveElm = document.querySelector(".js-user-move");
  pcMoveElm = document.querySelector(".js-pc-move");

  scoreCounter(lang);

  resultElm.innerHTML = result;
  // chosenMovesElm.innerHTML = chosenMoves;
  userMoveElm.innerHTML = userMove;
  pcMoveElm.innerHTML = pcMove;

  if (resultAnimation === "win") {
    userMoveElm.classList.add("winner-user");
    pcMoveElm.classList.add("loser-pc");
  } else if (resultAnimation === "lose") {
    userMoveElm.classList.add("loser-user");
    pcMoveElm.classList.add("winner-pc");
  } else if (resultAnimation === "tie") {
    userMoveElm.classList.add("tie-user");
    pcMoveElm.classList.add("tie-pc");
  }
}

function scoreCounter(lang = "en") {
  winsElm = document.querySelector(".js-game-wins") || 0;
  tiesElm = document.querySelector(".js-game-ties") || 0;
  lossesElm = document.querySelector(".js-game-losses") || 0;

  if (lang === "fa") {
    winsElm.innerHTML = enNumToFa(score.wins);
    lossesElm.innerHTML = enNumToFa(score.losses);
    tiesElm.innerHTML = enNumToFa(score.ties);
  } else {
    winsElm.innerHTML = score.wins;
    lossesElm.innerHTML = score.losses;
    tiesElm.innerHTML = score.ties;
  }
}

function resetScore() {
  score = {
    wins: 0,
    losses: 0,
    ties: 0,
  };

  scoreCounter('fa');

  localStorage.removeItem("score");
}

function autoPlay(lang = "en") {
  if (!isAutoPlaying) {
    intervalId = setInterval(function () {
      let userMove = Math.random();
      if (userMove < 1 / 3) {
        userMove = "✊";
      } else if (userMove > 1 / 3 && userMove < 2 / 3) {
        userMove = "✋";
      } else {
        userMove = "✌️";
      }
      playGame(userMove, "fa");
    }, 2000);
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }

  autoPlayMsg(lang);
}

function autoPlayMsg(lang = 'en') {
  let msgElm = document.querySelector(".js-auto-play");
  if (isAutoPlaying) {
    lang === "fa"
      ? (msgElm.innerHTML = "بازی خودکار روشن است")
      : (msgElm.innerHTML = "Auto Play is On");
  } else if (!isAutoPlaying) {
    lang === "fa"
      ? (msgElm.innerHTML = "بازی خودکار خاموش است")
      : (msgElm.innerHTML = "Auto Play is Off");
  }
}

function enNumToFa(num) {
  let str = num.toString();
  let replacements = [
    [0, "۰"],
    [1, "۱"],
    [2, "۲"],
    [3, "۳"],
    [4, "۴"],
    [5, "۵"],
    [6, "۶"],
    [7, "۷"],
    [8, "۸"],
    [9, "۹"],
    [10, "۱۰"],
  ];

  replacements.forEach(([oldWord, newWord]) => {
    str = str.replace(new RegExp(oldWord, "g"), newWord);
  });

  return str;
}
