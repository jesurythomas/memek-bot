function rollDice() {
  const sides = 6;
  return Math.floor(Math.random() * sides) + 1;
}

function rps() {
  const a = randomIntFromInterval(1, 3);
  const b = randomIntFromInterval(1, 3);
  let c;
  let d;

  if (a == 1) {
    c = "rock";
  } else if (a == 2) {
    c = "paper";
  } else {
    c = "scissors";
  }

  if (b == 1) {
    d = "rock";
  } else if (b == 2) {
    d = "paper";
  } else {
    d = "scissors";
  }

  if (c == d) {
    return { result: 0, userHand: c, toUserHand: d };
  } else {
    if (c == "rock" && d == "scissors") {
      return { result: 1, userHand: c, toUserHand: d };
    } else if (c == "rock" && d == "paper") {
      return { result: 2, userHand: c, toUserHand: d };
    } else if (c == "scissors" && d == "paper") {
      return { result: 1, userHand: c, toUserHand: d };
    } else if (c == "scissors" && d == "rock") {
      return { result: 2, userHand: c, toUserHand: d };
    } else if (c == "paper" && d == "rock") {
      return { result: 1, userHand: c, toUserHand: d };
    } else return { result: 2, userHand: c, toUserHand: d };
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

exports.rollDice = rollDice;
exports.rps = rps;
