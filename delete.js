var shell = require('shelljs')
module.exports = {
  deleteRepo: async (org, repo) => {
    await shell.rm('-r', [
      `./commit-logs/${org}/${repo}`,
      `./repos/${org}/${repo}`,
    ])
  },
  deleteAll: async () => {
    const dirs = [].concat(
      await shell.ls('-d', 'commit-logs/*').to('/dev/null'),
      await shell.ls('-d', 'repos/*').to('/dev/null'),
    )

    if (dirs.length > 0) {
      await shell.rm('-rf', dirs)
    }
  }
}