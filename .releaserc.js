module.exports = {
  extends: ['semantic-release-config-gitmoji'],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/npm',
    [
      '@semantic-release/git',
      {
        assets: ['dist/**/*.{js,mjs,ts}', 'docs', 'package.json'],
        message: ':bookmark: ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ],
  ],
}
