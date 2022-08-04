import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getJobsData, getPriorities, deleteJob } from "../../actions";

import { GrEdit } from "react-icons/gr";
import { RiDeleteBin5Fill } from "react-icons/ri";
import "./style.scss";

const List = () => {
  const dispatch = useDispatch();
  const jobsData = useSelector((state) => state.riseReducer.jobsData);
  const priorities = useSelector((state) => state.riseReducer.priorities);

  const [searchValue, setSearchValue] = useState("");
  const [category, setCategory] = useState(null);
  const [currentData, setCurrentData] = useState([]);

  const handleDelete = (jobId) => {
    dispatch(deleteJob(jobId));
  };
  const handleEdit = ({ jobId, jobName, jobPriority }) => {
    console.log({ jobId, jobName, jobPriority });
  };

  useEffect(() => {
    localStorage.getItem("dataJobs")
      ? dispatch(getJobsData(JSON.parse(localStorage.getItem("dataJobs"))))
      : dispatch(getJobsData([]));
    dispatch(getPriorities());
  }, [dispatch]);

  useEffect(() => {
    let filteredArray = jobsData || [];
    if (category) {
      filteredArray = filteredArray.filter(({ jobPriority }) => jobPriority === category);
    }
    if (searchValue !== "") {
      filteredArray = filteredArray.filter(({ jobName }) => jobName.includes(searchValue));
    }
    setCurrentData(filteredArray);
  }, [jobsData, searchValue, category]);

  return (
    <div className='containerList'>
      <h3>Job List</h3>
      <div className='container filterList'>
        <div className='row justify-content-md-center'>
          <div className='col col-lg-8'>
            <label htmlFor='searchValue' className='form-label'>
              Job Name
            </label>
            <input
              type='text'
              className='form-control'
              id='searchValue'
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
              placeholder='Search...'
            />
          </div>
          <div className='col col-lg-4'>
            <label htmlFor='priority' className='form-label'>
              Job Priority
            </label>
            <div className='dropdown'>
              <button
                className='priority btn dropdown-toggle btn-warning'
                style={{
                  border: "none",
                  backgroundColor:
                    category === "Normal"
                      ? "blue"
                      : category === "Önemli"
                      ? "yellow"
                      : category === "Acil"
                      ? "red"
                      : "whitesmoke",
                }}
                type='button'
                data-bs-toggle='dropdown'
                aria-expanded='true'>
                <span className='dropdownButton'>{category || "All"} </span>
              </button>
              <ul className='dropdown-menu priority'>
                <li key='All'>
                  <span className='badge text-bg-light priorityItem' onClick={() => setCategory(null)}>
                    All
                  </span>
                </li>
                {priorities.length > 0 ? (
                  priorities.map((item) => (
                    <li key={item}>
                      <span
                        className={
                          item === "Önemli"
                            ? "badge text-bg-warning priorityItem"
                            : item === "Acil"
                            ? "badge text-bg-danger priorityItem"
                            : "badge text-bg-primary priorityItem"
                        }
                        onClick={() => setCategory(item)}>
                        {item}
                      </span>
                    </li>
                  ))
                ) : (
                  <li>
                    <span className='badge priorityItem'>
                      <div className='alert alert-danger alertWarn' style={{ fontSize: `16px`, lineHeight: "27px" }}>
                        Please start api <br /> for get priorities!!!
                      </div>
                    </span>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
      {currentData.length > 0 && (
        <div className='table-responsive'>
          <table className='table'>
            <thead>
              <tr>
                <th scope='col'>Name</th>
                <th scope='col' style={{ paddingLeft: `5%` }}>
                  Priority
                </th>
                <th scope='col' style={{ paddingLeft: `3%` }}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {currentData.map(({ jobId, jobName, jobPriority }) => (
                <tr key={jobId}>
                  <td>{jobName}</td>
                  <td>
                    <span
                      className='badge'
                      style={{
                        fontSize: "17px",
                        width: "40%",
                        color: "black",
                        border: "none",
                        backgroundColor: jobPriority === "Önemli" ? "yellow" : jobPriority === "Acil" ? "red" : "blue",
                      }}>
                      {jobPriority}
                    </span>
                  </td>
                  <td>
                    <span
                      className='listIcon badge text-bg-light'
                      style={{ cursor: `pointer` }}
                      onClick={() => handleEdit({ jobId, jobName, jobPriority })}>
                      <GrEdit size={18} />
                    </span>
                    <span
                      className='listIcon badge text-bg-danger'
                      style={{ cursor: `pointer` }}
                      onClick={() => handleDelete(jobId)}>
                      <RiDeleteBin5Fill size={18} />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default List;
