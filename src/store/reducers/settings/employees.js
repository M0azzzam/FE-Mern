import { employeesConstants } from '../../actions/settings/employees';

const initialState = {
  roles: {
    error: null,
    isLoading: false,
    data: []
  },
  employees: {
    error: null,
    isLoading: false,
    data: []
  }
};

export default function employees(state = initialState, action) {
  switch (action.type) {
    case employeesConstants.GET_ROLES_REQUEST:
      return {
        ...state, roles: { ...state.roles, isLoading: true }
      }
    case employeesConstants.GET_ROLES_SUCCESS:
      return {
        ...state, roles: { isLoading: false, data: action.payload }
      }
    case employeesConstants.GET_ROLES_FAILURE:
      return {
        ...state, roles: { isLoading: false, data: [], error: action.payload }
      }
    case employeesConstants.UPDATE_ROLES_REQUEST:
      return {
        ...state, roles: { ...state.roles, isUpdating: true }
      }
    case employeesConstants.UPDATE_ROLES_SUCCESS:
      return {
        ...state, roles: { ...state.roles, isUpdating: false }
      }
    case employeesConstants.UPDATE_ROLES_FAILURE:
      return {
        ...state, roles: { ...state.roles, error: action.payload }
      }
    case employeesConstants.GET_EMPLOYEES_REQUEST:
      return {
        ...state, employees: { ...state.employees, isLoading: true }
      }
    case employeesConstants.GET_EMPLOYEES_SUCCESS:
      return {
        ...state, employees: { isLoading: false, data: action.payload }
      }
    case employeesConstants.GET_EMPLOYEES_FAILURE:
      return {
        ...state, employees: { isLoading: false, error: action.payload }
      }
    default:
      return state;
  }
}
