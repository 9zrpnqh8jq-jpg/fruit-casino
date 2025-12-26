const slots = document.querySelectorAll(".slot");
const playBtn = document.getElementById("play");
const counter = document.getElementById("counter");
const balanceEl = document.getElementById("balanceEl");
const multiEl = document.getElementById("multiEl");
const bets = document.querySelectorAll(".bet");

let balance = 1000;
let bet = 10;
let lucky = 1;

const fruits = [
  { icon: "🍒", chance: 0.25, win: 2 },
  { icon: "🍋", chance: 0.22, win: 3 },
  { icon: "🍇", chance: 0.18, win: 5 },
  { icon: "🍉", chance: 0.15, win: 10 },
  { icon: "🍊", chance: 0.12, win: 15 },
  { icon: "🍎", chance: 0.08, win: 20 }
];

bets.forEach(b => {
  b.onclick = () => bet = Number(b.dataset.bet);
});

playBtn.onclick = () => {
  if (balance < bet) return alert("❌ الرصيد غير كافي");

  balance -= bet;
  balanceEl.textContent = balance;

  spin();
};

function spin() {
  let count = 0;
  const spinInterval = setInterval(() => {
    slots.forEach(s => {
      s.textContent = fruits[Math.floor(Math.random() * fruits.length)].icon;
    });
    counter.textContent = String(count).padStart(4, "0");
    count++;
  }, 100);

  setTimeout(() => {
    clearInterval(spinInterval);
    checkWin();
  }, 2000);
}

function checkWin() {
  const rand = Math.random();
  let sum = 0;

  for (let f of fruits) {
    sum += f.chance;
    if (rand <= sum) {
      slots.forEach(s => s.textContent = f.icon);
      let winAmount = bet * f.win * lucky;
      balance += winAmount;
      balanceEl.textContent = balance;
      alert("🎉 فزت بـ " + winAmount);
      return;
    }
  }
}
