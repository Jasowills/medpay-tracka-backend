// jest.setup.js

// Extend Jest's expect with additional matchers
require('jest-extended');

// Set a longer timeout for tests
jest.setTimeout(30000); // 30 seconds

// Add any other global setup here
global.someGlobalFunction = () => {
    // implementation
};
