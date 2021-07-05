// __mocks__/axios.js

// easier to merge objects
import assignIn from 'lodash/assignIn';

// cannot require axios, otherwise it recursively mocks
const axios = jest.requireActual('axios');
jest.unmock('axios');

import MockAdapter from 'axios-mock-adapter';
const mockAxios = new MockAdapter(axios);

// nothing important seems to be overwritten
module.exports = assignIn(axios, mockAxios);
