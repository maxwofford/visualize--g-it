var express = require('express')
var app = express()

app.use(express.static('public'))

const clone = require('./clone.js')
app.get('/:org/:repo', async (req, res) => {
  const { org, repo } = req.params

  new Promise(resolve => {
    setTimeout(() => {clone(org, repo)}, 1000)
  })

  res.sendFile(__dirname + '/public/visualizer.html')
  // ^ send the user on their merry way before doing the heavy work...
})

const shell = require('shelljs')
app.get('/api/:org/:repo', async (req, res) => {
  const result = {}
  result.status = 'loading'
  const { org, repo } = req.params
  const cat = shell.cat(`./commit-logs/${org}/${repo}/log.txt`)
  if (cat.code == 0) {
    result.status = 'done'
    result.content = cat
  }
  res.json(result)
})

const { deleteAll } = require('./delete.js')
app.delete('/api/:org/:repo', async (req, res) => {
  const { org, repo } = req.params
  await deleteRepo(org, repo)
  res.json({ ok: true })
})
app.delete('/api/delete-all', async (req, res) => {
  await deleteAll()
  res.json({ ok: true })
})
deleteAll()


app.listen(3000)