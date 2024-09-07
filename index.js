import Database from './database.js';

let tg = window.Telegram.WebApp;
tg.expand();

const db = new Database('hamster.db');
db.initTable();
db.addUser(tg.initData.user.id);

score = document.getElementById('score');
score.innerText = db.getScore(tg.initData.user.id);

btn = document.getElementById('mainButton');
btn.addEventListener('click', () => {
    let currentScore = parseInt(score.innerText) || 0;
    currentScore += 1;
    score.innerText = currentScore;
    db.updateScore(tg.initData.user.id, currentScore);
});