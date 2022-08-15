module.exports = {
    testEnvironment: 'jsdom',
    testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
    setupFilesAfterEnv: ['<rootDir>/setupTests.config.js'],
    testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/', '<rootDir>/coverage', '<rootDir>/dist'],
    moduleDirectories: ['<rootDir>/node_modules', '<rootDir>/src'],
    moduleNameMapper: {
        '@src/(.*)': '<rootDir>/src/$1',
        '@styles/(.*)': '<rootDir>/src/styles/$1',
        '@public/(.*)': '<rootDir>/public/$1',
        '@mock/(.*)': '<rootDir>/src/_mocks_/$1',
        '^firebase/(.*)$': '<rootDir>/node_modules/firebase/$1',
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
    coverageDirectory: 'coverage',
    collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
    qcoverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
    //   '/^.+.(css|less|scss|sass)$/': '<rootDir>/node_modules/identity-obj-proxy',
      '.+\\.(svg|css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub'
    },
  };