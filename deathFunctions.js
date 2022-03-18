let deaths = 0;

function addDeath() {
  deaths++;
}

function getDeaths() {
  return deaths;
}

function resetDeaths() {
  deaths = 0;
}

function setDeaths(number) {
  if (isNaN(number)) {
    return 0;
  } else {
    deaths = number;
    return 1;
  }
}

exports.addDeath = addDeath;
exports.getDeaths = getDeaths;
exports.resetDeaths = resetDeaths;
exports.setDeaths = setDeaths;
