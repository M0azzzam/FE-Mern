import {jobConstants} from '../../actions/settings/jobs';

const initialState = {
  error: null,
  isLoading: false,
  isUpdating: false,
  data: [],
  meta: {},
  job: {},
  jobId: {
    isLoading: false,
    id: null
  }
};

export default function jobs(state = initialState, action) {
  switch (action.type) {
    case jobConstants.GET_JOBS_REQUEST:
      return {
        ...state, isLoading: true
      }
    case jobConstants.GET_JOBS_SUCCESS:
      const {data, ...rest} = action.payload;
      return {
        ...state, data, meta: rest, isLoading: false
      }
    case jobConstants.GET_JOBS_FAILURE:
      return {
        ...state, isLoading: false, data: [], error: action.payload
      }
    case jobConstants.GET_JOB_REQUEST:
      return {
        ...state, isLoading: true
      }
    case jobConstants.GET_JOB_SUCCESS:
      return {
        ...state, job: action.payload, isLoading: false
      }
    case jobConstants.GET_JOB_FAILURE:
      return {
        ...state, isLoading: false, data: [], error: action.payload
      }
    case jobConstants.GET_JOB_ID_REQUEST:
      return {
        ...state, jobId: {...state.jobId, isLoading: true}
      }
    case jobConstants.GET_JOB_ID_SUCCESS:
      return {
        ...state, jobId: {...state.jobId, isLoading: false, id: action.payload}
      }
    case jobConstants.GET_JOB_ID_FAILURE:
      return {
        ...state, jobId: {...state.jobId, isLoading: false}, error: action.payload
      }
    case jobConstants.CREATE_JOB_REQUEST:
      return {
        ...state, isUpdating: true
      }
    case jobConstants.CREATE_JOB_SUCCESS:
      return {
        ...state, isUpdating: false
      }
    case jobConstants.CREATE_JOB_FAILURE:
      return {
        ...state, error: action.payload, isUpdating: false
      }
    case jobConstants.UPDATE_JOB_REQUEST:
      return {
        ...state, isUpdating: true
      }
    case jobConstants.UPDATE_JOB_SUCCESS:
      return {
        ...state, isUpdating: false
      }
    case jobConstants.UPDATE_JOB_FAILURE:
      return {
        ...state, error: action.payload, isUpdating: false
      }
    case jobConstants.UPDATE_JOB_STATUS_REQUEST:
      return {
        ...state, isUpdating: true
      }
    case jobConstants.UPDATE_JOB_STATUS_SUCCESS:
      const _data = state.data.map((d) => {
        if (d._id === action.payload._id) {
          d.status = action.payload.status;
        }
        return d;
      });
      return {
        ...state, isUpdating: false, data: _data
      }
    case jobConstants.UPDATE_JOB_STATUS_FAILURE:
      return {
        ...state, error: action.payload, isUpdating: false
      }
    case jobConstants.DELETE_JOBS_REQUEST:
      return {
        ...state, isUpdating: true
      }
    case jobConstants.DELETE_JOBS_SUCCESS:
      return {
        ...state, isUpdating: false
      }
    case jobConstants.DELETE_JOBS_FAILURE:
      return {
        ...state, error: action.payload, isUpdating: false
      }
    default:
      return state;
  }
}
