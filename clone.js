var shell = require('shelljs')
if (!shell.which('git')) {
  shell.echo('Sorry, this script requires git')
  shell.exit(1)
}
// if (!shell.which('flock')) {
//   shell.echo('Sorry, this script requires flock')
//   shell.exit(1)
// }

function git(org, repo) {
  return `git --git-dir ./repos/${org}/${repo}/.git`
}

function logRepo(org, repo) {
  const logPath = `./commit-logs/${org}/${repo}`
  shell.mkdir('-p', logPath)
  const logResult = shell.exec(`${git(org, repo)} log --pretty=format:user:%aN%n%ct --reverse --raw --encoding=UTF-8 --no-renames --no-show-signature`).to(logPath + '/log.txt')
  return logResult
}

module.exports = async (org, repo) => {
  const repoUrl = `https://github.com/${org}/${repo}`

  shell.mkdir('-p', [
    `./commit-logs/${org}/${repo}`,
    `./repos/${org}/${repo}`,
  ])
  shell.exec(`git clone ${repoUrl} ./repos/${org}/${repo}`)
  shell.exec(`${git(org, repo)} pull`)

  const log = logRepo(org, repo)
  return log
}