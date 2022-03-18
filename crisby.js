require("dotenv").config();

const rng = require("./rngFunctions.js");
const death = require("./deathFunctions.js");
const tmi = require("tmi.js");
const fs = require("fs");
let losers;
let rpsTimeOut = false;
let statsTimeOut = false;
function jsonReader(filePath, cb) {
  fs.readFile(filePath, "utf-8", (err, fileData) => {
    if (err) {
      return cb && cb(err);
    } else {
      try {
        const data = JSON.parse(fileData);
        return cb && cb(null, data);
      } catch (err) {
        return cb && cb(null, err);
      }
    }
  });
}

jsonReader("./crisby-losers.json", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    losers = data;
    console.log(losers);
  }
});

const regexpCommand = new RegExp(/^!([a-zA-Z0-9]+)(?:\W+)?(.*)?/);

const commands = {
  dice: {
    response: (user) => {
      const num = rng.rollDice();
      return `${user} rolled a ${num}`;
    },
  },
  deaths: {
    response: (channel) => {
      const deathCount = death.getDeaths();
      return `${channel} has died ${deathCount} times`;
    },
  },
  addDeath: {
    response: (channel) => {
      death.addDeath();
      const deathCount = death.getDeaths();
      return `${channel} has now died ${deathCount} times`;
    },
  },
  setDeaths: {
    response: (channel, number) => {
      const retVal = death.setDeaths(number);
      if (retVal == 0) return "";

      const deathCount = death.getDeaths();
      return `${channel} has now died ${deathCount} times`;
    },
  },
  resetDeaths: {
    response: (channel) => {
      death.resetDeaths();
      const deathCount = death.getDeaths();
      return `${channel} has now died ${deathCount} times`;
    },
  },
  rps: {
    response: (user, toUser, channel) => {
      console.log(user);
      console.log(toUser);
      console.log(channel);
      if (!rpsTimeOut) {
        rpsTimeOut = true;
        setTimeout(() => {
          rpsTimeOut = false;
        }, 10000);
        let retVal = rng.rps();
        if (user.toLowerCase() == channel.toLowerCase()) {
          jsonReader("./crisby-losers.json", (err, data) => {
            if (err) {
              console.log(err);
            } else {
              losers = data;
              jsonUser = user.toLowerCase();
              jsonToUser = toUser.toLowerCase();
              if (losers[jsonUser] == undefined) {
                losers[jsonUser] = {
                  fights: 1,
                  loss: 0,
                  wins: 1,
                  ties: 0,
                };
              } else {
                losers[jsonUser].fights += 1;
                losers[jsonUser].wins += 1;
              }

              if (losers[jsonToUser] == undefined) {
                losers[jsonToUser] = {
                  fights: 1,
                  loss: 1,
                  wins: 0,
                  ties: 0,
                };
              } else {
                losers[jsonToUser].loss += 1;
                losers[jsonToUser].fights += 1;
              }

              fs.writeFile("./crisby-losers.json", JSON.stringify(losers), (err) => {
                if (err) {
                  console.log(err);
                }
              });
            }
          });

          message = `${channel} always wins EZ`;
          return { result: 4, message: message };
        }

        if (channel.toLowerCase() == toUser.toLowerCase()) {
          jsonReader("./crisby-losers.json", (err, data) => {
            if (err) {
              console.log(err);
            } else {
              losers = data;
              jsonUser = user.toLowerCase();
              jsonToUser = toUser.toLowerCase();
              if (losers[jsonUser] == undefined) {
                losers[jsonUser] = {
                  fights: 1,
                  loss: 1,
                  wins: 0,
                  ties: 0,
                };
              } else {
                losers[jsonUser].fights += 1;
                losers[jsonUser].loss += 1;
              }

              if (losers[jsonToUser] == undefined) {
                losers[jsonToUser] = {
                  fights: 1,
                  loss: 0,
                  wins: 1,
                  ties: 0,
                };
              } else {
                losers[jsonToUser].wins += 1;
                losers[jsonToUser].fights += 1;
              }

              fs.writeFile("./crisby-losers.json", JSON.stringify(losers), (err) => {
                if (err) {
                  console.log(err);
                }
              });
            }
          });

          message = `${channel} never loses you pleb OMEGALUL`;
          return { result: 3, message: message };
        }
        if (retVal.result == 0) {
          jsonReader("./crisby-losers.json", (err, data) => {
            if (err) {
              console.log(err);
            } else {
              losers = data;
              jsonUser = user.toLowerCase();
              jsonToUser = toUser.toLowerCase();
              if (losers[jsonUser] == undefined) {
                losers[jsonUser] = {
                  fights: 1,
                  loss: 0,
                  wins: 0,
                  ties: 1,
                };
              } else {
                losers[jsonUser].fights += 1;
                losers[jsonUser].ties += 1;
              }

              if (losers[jsonToUser] == undefined) {
                losers[jsonToUser] = {
                  fights: 1,
                  loss: 0,
                  wins: 0,
                  ties: 1,
                };
              } else {
                losers[jsonToUser].ties += 1;
                losers[jsonToUser].fights += 1;
              }

              fs.writeFile("./crisby-losers.json", JSON.stringify(losers), (err) => {
                if (err) {
                  console.log(err);
                }
              });
            }
          });

          message = `${user} and ${toUser} tied with ${retVal.userHand}  PawgChamp`;
          return { result: retVal.result, message: message };
        }
        if (retVal.result == 1) {
          jsonReader("./crisby-losers.json", (err, data) => {
            if (err) {
              console.log(err);
            } else {
              losers = data;
              jsonUser = user.toLowerCase();
              jsonToUser = toUser.toLowerCase();
              if (losers[jsonUser] == undefined) {
                losers[jsonUser] = {
                  fights: 1,
                  loss: 0,
                  wins: 1,
                  ties: 0,
                };
              } else {
                losers[jsonUser].fights += 1;
                losers[jsonUser].wins += 1;
              }

              if (losers[jsonToUser] == undefined) {
                losers[jsonToUser] = {
                  fights: 1,
                  loss: 1,
                  wins: 0,
                  ties: 0,
                };
              } else {
                losers[jsonToUser].loss += 1;
                losers[jsonToUser].fights += 1;
              }
              fs.writeFile("./crisby-losers.json", JSON.stringify(losers), (err) => {
                if (err) {
                  console.log(err);
                }
              });
            }
          });

          message = `${user}'s ${retVal.userHand} won against ${toUser}'s ${retVal.toUserHand}  FeelsEvilMan`;

          return { result: retVal.result, message: message };
        }
        if (retVal.result == 2) {
          jsonReader("./crisby-losers.json", (err, data) => {
            if (err) {
              console.log(err);
            } else {
              losers = data;
              jsonUser = user.toLowerCase();
              jsonToUser = toUser.toLowerCase();
              if (losers[jsonUser] == undefined) {
                losers[jsonUser] = {
                  fights: 1,
                  loss: 1,
                  wins: 0,
                  ties: 0,
                };
              } else {
                losers[jsonUser].fights += 1;
                losers[jsonUser].loss += 1;
              }

              if (losers[jsonToUser] == undefined) {
                losers[jsonToUser] = {
                  fights: 1,
                  loss: 0,
                  wins: 1,
                  ties: 0,
                };
              } else {
                losers[jsonToUser].wins += 1;
                losers[jsonToUser].fights += 1;
              }

              fs.writeFile("./crisby-losers.json", JSON.stringify(losers), (err) => {
                if (err) {
                  console.log(err);
                }
              });
            }
          });
          message = `${user}'s ${retVal.userHand} lost against ${toUser}'s ${retVal.toUserHand}  PepeLoser`;
          return { result: retVal.result, message: message };
        }
      } else {
        return { result: null, message: "" };
      }
    },
  },
  stats: {
    response: (user, toUser) => {
      if (!statsTimeOut) {
        statsTimeOut = true;
        setTimeout(() => {
          statsTimeOut = false;
        }, 1500);
        if (toUser != undefined) {
          retVal = checkLoss(toUser.toLowerCase());
          if (retVal == undefined) return `${toUser} has no stats available`;
          return {
            message: `${toUser} Matches: ${retVal.fights}  Win: ${retVal.wins}(${(
              (retVal.wins / retVal.fights) *
              100
            ).toFixed(2)}%) Tie: ${retVal.ties}(${((retVal.ties / retVal.fights) * 100).toFixed(
              2
            )}%) Lose: ${retVal.loss}(${((retVal.loss / retVal.fights) * 100).toFixed(2)}%)`,
          };
        }
        if (user) {
          retVal = checkLoss(user.toLowerCase());
          if (retVal == undefined) return `${user} has no stats available`;
          return {
            message: `${user} Matches: ${retVal.fights}  Win: ${retVal.wins}(${(
              (retVal.wins / retVal.fights) *
              100
            ).toFixed(2)}%) Tie: ${retVal.ties}(${((retVal.ties / retVal.fights) * 100).toFixed(
              2
            )}%) Lose: ${retVal.loss}(${((retVal.loss / retVal.fights) * 100).toFixed(2)}%)`,
          };
        }
      } else {
        return { message: null };
      }
    },
  },
};

const client = new tmi.Client({
  options: { debug: true, messagesLogLevel: "info" },
  connection: {
    reconnect: true,
    secure: true,
  },

  identity: {
    username: `${process.env.TWITCH_USERNAME2}`,
    password: `oauth:${process.env.TWITCH_OAUTH2}`,
  },

  channels: [`${process.env.TWITCH_CHANNEL2}`],
});

client.connect().catch(console.error);

client.on("message", (channel, tags, message, self) => {
  if (self) {
    return;
  }

  if (message.match(regexpCommand) === null) {
    return;
  }

  let [raw, command, argument] = message.match(regexpCommand);

  if (argument != null) argument = argument.split(" ");

  const { response } = commands[command] || {};

  const channelName = capitalize(channel);

  if (typeof response === "function") {
    switch (command) {
      case "dice":
        client.say(channel, response(tags["display-name"]));
        break;
      case "deaths":
        client.say(channel, response(channelName));
        break;
      case "addDeath":
        client.say(channel, response(channelName));
        break;
      case "setDeaths": {
        if (argument == null) return;
        client.say(channel, response(channelName, Number(argument[0])));
        break;
      }
      case "resetDeaths":
        client.say(channel, response(channelName));
        break;
      case "rps": {
        if (argument == null) return;
        if (tags["display-name"] == argument[0]) {
          return client.say(channel, `/timeout ${argument[0]} 10`);
        }
        let returns = response(tags["display-name"], argument[0], channelName);

        client.say(channel, returns.message);

        if (returns.result == 4) client.say(channel, `/timeout ${argument[0]} 10`);
        if (returns.result == 3) client.say(channel, `/timeout ${tags["display-name"]} 10`);
        if (returns.result == 1) client.say(channel, `/timeout ${argument[0]} 10`);
        if (returns.result == 2) client.say(channel, `/timeout ${tags["display-name"]} 10`);
        if (returns.result == null) return;
        break;
      }
      case "stats": {
        if (argument == null) {
          message = response(tags["display-name"]);
          if (message.message != null) client.say(channel, message.message);
          break;
        } else {
          message = response(tags["display-name"], argument[0]);
          if (message.message != null) client.say(channel, message.message);
          break;
        }
      }
    }
  } else if (typeof response === "string") {
    client.say(channel, response);
  }
});

function capitalize(s) {
  var s1 = s;
  var s2 = s1.substring(1);

  return s2 && s2[0].toUpperCase() + s2.slice(1);
}

function checkLoss(user) {
  if (losers[user]) {
    return losers[user];
  } else return;
}
