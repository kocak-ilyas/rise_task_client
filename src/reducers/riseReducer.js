import * as actionTypes from "./constants";
let initState = {
  priorities: [],
  jobsData: [],
};

export const riseReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_JOBS_DATA:
      return { ...state, jobsData: action.data };

    case actionTypes.GET_PRIORITY:
      return { ...state, priorities: action.priorities };

    case actionTypes.CREATE_JOB:
      localStorage.setItem("dataJobs", JSON.stringify([...state.jobsData, action.job]));
      return { ...state, jobsData: [...state.jobsData, action.job] };

    case actionTypes.DELETE_JOB:
      let tempData = state.jobsData.filter(({ jobId }) => jobId !== action.jobId);
      localStorage.setItem("dataJobs", JSON.stringify(tempData));
      return { ...state, jobsData: tempData };

    default:
      return state;
  }
};
