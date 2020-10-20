import configureStore from 'redux-mock-store';
import { setUser, setLogout, setUserAppointments, setServices } from '../actions/index';

const userDataTemplate = {};

const appointmentsTemplate = {};

const servicesTemplate = {};

const mockStore = configureStore();
const store = mockStore();

describe('set appointments and services tests', () => {
  beforeEach(() => {
    store.clearActions();
  });

  describe('setAppointments', () => {
    test('Dispatches the correct action and payload', () => {
      const expectedActions = [
        {
          appointments: appointmentsTemplate,
          type: 'SET_APPOINTMENTS',
        },
      ];

      store.dispatch(setUserAppointments(appointmentsTemplate));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('setServices', () => {
    test('Dispatches the correct action and payload', () => {
      const expectedActions = [
        {
          services: servicesTemplate,
          type: 'SET_SERVICES',
        },
      ];

      store.dispatch(setServices(servicesTemplate));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('authorization tests', () => {
  beforeEach(() => {
    store.clearActions();
  });

  describe('setUser', () => {
    test('Dispatches the correct action and payload', () => {
      const expectedActions = [
        {
          user: userDataTemplate,
          type: 'SET_USER',
        },
      ];

      store.dispatch(setUser(userDataTemplate));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('setLogout', () => {
    test('Dispatches the correct action and payload', () => {
      const expectedActions = [
        {
          type: 'LOG_OUT',
        },
      ];

      store.dispatch(setLogout());
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});