import React from 'react'
import { render, getByText } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Menu from '../components/Menu'
import { Provider } from 'react-redux';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

const mockStore = configureStore();

const state = {
  userData: {
    user: {
    email: "azeem@example.com",
    id: 1,
    password_digest: "$2a$12$KDu3d9ArzVYrXBehQElSCO.C..3bZjLKeRwdmDEAaPwe45UwdUPdS",
    username: "azeem"
    }
  }
}

test('the menu is displayed', () => {
  const store = mockStore(state);
  const { container } = render(
    <Provider store={store}>
      <Router>
        <Menu />  
      </Router>
    </Provider>
  );

  const services = getByText(container, 'Services');
  const appointments = getByText(container, 'Appointments');
  const serviceForm = getByText(container, 'Book a service');

  expect(services).toBeInTheDocument();
  expect(appointments).toBeInTheDocument();
  expect(serviceForm).toBeInTheDocument();
})