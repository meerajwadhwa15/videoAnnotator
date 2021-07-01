import React from 'react';
import ReactDOM from 'react-dom';
import Login from '.';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Login />, div);
  ReactDOM.unmountComponentAtNode(div);
});
