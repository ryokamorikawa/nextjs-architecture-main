// create fake version of GET Http object
import { jest } from '@jest/globals';

const axiosMock = {
  get: jest.fn(() => Promise.resolve({ status: 200, data: {} })),
};

export default axiosMock;
