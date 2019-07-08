var SlackBot = require('slackbots');
var request = require("request")
// create a bot
const envKey = process.env.DISHWASH_BOT_TOKEN;
var bot = new SlackBot({
  token: envKey,
  name: "DishwashBot"
})

bot.on("message", msg => {
    switch (msg.type) {
      case "message":
        // we only want to listen to direct messages that come from the user
        if (msg.channel[0] === "D" && msg.bot_id === undefined) {
          getRandomJoke(postMessage, msg.user)
        }
        break;
    }
  })

  const postMessage = (message, user) => {
    bot.postMessage(user, message, { as_user: true })
  }

    const getRandomJoke = (callback, user) => {
        return request("https://icanhazdadjoke.com/slack", (error, response) => {
          if (error) {
            console.log("Error: ", error)
          } else {
            let jokeJSON = JSON.parse(response.body)
            let joke = jokeJSON.attachments[0].text
            return callback(joke, user)
          }
        });
      };

