export default {
    testEnvironment: 'jsdom', // Use jsdom for React component testing
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', // Transform JS/JSX/TS/TSX files
    },
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Optional setup file (we'll create this next)
  };