import * as actionTypes from "../reducers/constants";
import axios from "axios";
const apiUrlHeader = `http://localhost:5000/api`;

export const getJobsData = (data) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_JOBS_DATA, data });
  } catch (error) {
    console.log(error);
  }
};

export const getPriorities = () => async (dispatch) => {
  try {
    await axios.get(apiUrlHeader + `/get_priority`).then((response) => {
      !response.data.error && dispatch({ type: actionTypes.GET_PRIORITY, priorities: response.data.priorityData });
    });
  } catch (error) {
    console.log(error);
  }
};

export const createItem =
  ({ name, priority }) =>
  async (dispatch) => {
    try {
      dispatch({ type: actionTypes.CREATE_JOB, job: { jobId: Date.now(), jobName: name, jobPriority: priority } });
    } catch (error) {
      console.log(error);
    }
  };

export const deleteJob = (jobId) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.DELETE_JOB, jobId });
  } catch (error) {
    console.log(error);
  }
};

export const editJob = (editItem) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.EDIT_JOB, editItem });
  } catch (error) {
    console.log(error);
  }
};
