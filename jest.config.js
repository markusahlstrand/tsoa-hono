module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.(t|j)sx?$': 'ts-jest',
  },
  testRegex: '/test/.*\\.spec\\.ts$',
  collectCoverageFrom: ['src/**/*.{ts,js}'],
};
