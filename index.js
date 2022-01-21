var express = require('express')
var app = express()

app.use(express.static('public'))

const clone = require('./clone.js')
app.get('/:org/:repo', async (req, res) => {
  const { org, repo } = req.params
  res.redirect(`visualizer.html?org=${org}&repo=${repo}`)
  // ^ send the user on their merry way before doing the heavy work...

  await clone(org, repo)
})

app.listen(3000)