module.exports = {
  verbose: true,
  cache: true,
  moduleFileExtensions: [ 'vue', 'js'],
  transform:{
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    ".*\\.(vue)$": "vue-jest"
  },
  collectCoverageFrom: [
    'src/**/*.js',
    'src/**/*.vue',
    '!src/main.js',
    '!**/node_modules/**'
  ],
  coverageDirectory: '<rootDir>/test/unit/coverage',
  transformIgnorePatterns:['<rootDir>/node_modules/'],
  testURL: "http://localhost"
}