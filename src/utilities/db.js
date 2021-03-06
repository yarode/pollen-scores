const mongoose = require('mongoose')
const model = 'Scoreboard'
require('../models/scoreboard')

async function dbHandler(top10) {
    let document = {
      created: new Date(),
    }
    let users = []
    for(let i = 0; i < top10.length; i++) {
      const name = top10[i].account.identity.name
      const weekCred = top10[i].cred[top10[i].cred.length - 1]
      users[i] = {"rank": i + 1, "name": name, "cred": Math.round(weekCred)}
    }
    document.scoreboard = users
    console.log(document)
    const modelFound = await mongoose.model(model)
    let resultPromise = await modelFound.create(document, (erro) => {
      if(erro) {
        console.log(erro)
      }
    })
}

module.exports = { dbHandler }
