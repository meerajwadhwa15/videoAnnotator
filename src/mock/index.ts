import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mockAxios = axios.create();

const mock = new MockAdapter(mockAxios);

mock.onGet('/pokemon/pikachu').reply(200, {
  id: 0,
  types: [{ type: 'electric' }],
  name: 'Pikachu',
  height: 40,
  weight: 20,
  sprites: {
    front_default: 'https://via.placeholder.com/150.png/09f/fff',
  },
});

mock.onPost('/login').reply(200, {
  data: {
    status: 'success',
    accessToken: 'gdhahdgajldah;dgsjfbkfha;fk',
  },
});

export { mockAxios };
