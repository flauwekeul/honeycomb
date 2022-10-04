const { promisify } = require('util')
const dateFormat = require('dateformat')
const readFileAsync = promisify(require('fs').readFile)
const path = require('path')

const TEMPLATE_DIR = path.resolve(__dirname, 'node_modules/semantic-release-gitmoji/lib/assets/templates')
const template = readFileAsync(path.join(TEMPLATE_DIR, 'default-template.hbs'))
const commitTemplate = readFileAsync(path.join(TEMPLATE_DIR, 'commit-template.hbs'))

module.exports = {
  plugins: [
    // copied from https://github.com/momocow/semantic-release-gitmoji
    [
      'semantic-release-gitmoji',
      {
        releaseRules: {
          major: [':boom:'],
          minor: [':sparkles:'],
          patch: [':bug:', ':ambulance:', ':lock:'],
        },
        releaseNotes: {
          template,
          partials: { commitTemplate },
          helpers: {
            datetime: function (format = 'UTC:yyyy-mm-dd') {
              return dateFormat(new Date(), format)
            },
          },
          issueResolution: {
            template: '{baseUrl}/{owner}/{repo}/issues/{ref}',
            baseUrl: 'https://github.com',
            source: 'github.com',
          },
        },
      },
    ],
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/github',
    '@semantic-release/npm',
    [
      '@semantic-release/git',
      {
        assets: ['docs', 'package.json'],
        message: ':bookmark: ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ],
  ],
}
