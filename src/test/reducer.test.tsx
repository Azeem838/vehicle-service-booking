import reducer from '../reducers/index';

const userDataTemplate = {};
const appointsTemplate = {}
const servicesTemplate = {}

describe('reducer', () => {
  describe('INITIAL_STATE', () => {
    test('returns initial state', () => {
      const action = { type: 'dummy_action' };
      const initialState = {};

      expect(reducer(undefined, action)).toEqual(initialState);
    });
  });

  describe('SET_USER', () => {
    test('returns the changed state', () => {
      const action = { type: 'SET_USER', user: userDataTemplate };
      const expectedState = { userData: userDataTemplate };

      expect(reducer(undefined, action)).toEqual(expectedState);
    });
  });


  describe('SET_APPOINTMENTS', () => {
    test('returns the changed state', () => {
      const action = { type: 'SET_APPOINTMENTS', appointments: appointsTemplate };
      const expectedState = { appointments: appointsTemplate };

      expect(reducer(undefined, action)).toEqual(expectedState);
    });
  });

  describe('SET_SERVICES', () => {
    test('returns the changed state', () => {
      const action = { type: 'SET_SERVICES', services: servicesTemplate };
      const expectedState = { services: servicesTemplate };

      expect(reducer(undefined, action)).toEqual(expectedState);
    });
  });
});