import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getJobsData, deleteJob, editJob } from "../../actions";

import { GrEdit } from "react-icons/gr";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaExclamationCircle } from "react-icons/fa";
import "./style.scss";

const List = () => {
  const dispatch = useDispatch();
  const jobsData = useSelector((state) => state.riseReducer.jobsData);
  const priorities = useSelector((state) => state.riseReducer.priorities);

  const [searchValue, setSearchValue] = useState("");
  const [category, setCategory] = useState(null);
  const [currentDataUrgent, setCurrentDataUrgent] = useState([]);
  const [currentDataRegular, setCurrentDataRegular] = useState([]);
  const [currentDataTrivial, setCurrentDataTrivial] = useState([]);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [editItem, setEditItem] = useState({});

  const handleDelete = () => {
    deleteItemId && dispatch(deleteJob(deleteItemId));
  };
  const handleEdit = () => {
    editItem && dispatch(editJob(editItem));
  };

  useEffect(() => {
    localStorage.getItem("dataJobs")
      ? dispatch(getJobsData(JSON.parse(localStorage.getItem("dataJobs"))))
      : dispatch(getJobsData([]));
  }, [dispatch]);

  useEffect(() => {
    let filteredArray = jobsData || [];

    if (category) {
      filteredArray = filteredArray.filter(({ jobPriority }) => jobPriority === category);
    }
    if (searchValue !== "") {
      filteredArray = filteredArray.filter(({ jobName }) => jobName.includes(searchValue));
    }

    setCurrentDataUrgent(filteredArray.filter(({ jobPriority }) => jobPriority === "Urgent"));
    setCurrentDataRegular(filteredArray.filter(({ jobPriority }) => jobPriority === "Regular"));
    setCurrentDataTrivial(filteredArray.filter(({ jobPriority }) => jobPriority === "Trivial"));
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
                id='priority'
                className='priority btn dropdown-toggle btn-warning'
                style={{
                  border: "none",
                  backgroundColor:
                    category === "Trivial"
                      ? "blue"
                      : category === "Regular"
                      ? "yellow"
                      : category === "Urgent"
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
                          item === "Regular"
                            ? "badge text-bg-warning priorityItem"
                            : item === "Urgent"
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
      {
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
              {currentDataUrgent
                .sort((a, b) => {
                  return ("" + a.jobName).localeCompare(b.jobName);
                })
                .map(({ jobId, jobName, jobPriority }) => (
                  <tr key={jobId}>
                    <td>{jobName}</td>
                    <td>
                      <span
                        className='badge'
                        style={{
                          fontSize: "17px",
                          width: "40%",
                          minWidth: "87px",
                          color: "black",
                          border: "none",
                          backgroundColor:
                            jobPriority === "Regular" ? "yellow" : jobPriority === "Urgent" ? "red" : "blue",
                        }}>
                        {jobPriority}
                      </span>
                    </td>
                    <td>
                      <span
                        className='listIcon badge text-bg-light'
                        style={{ cursor: `pointer` }}
                        data-bs-toggle='modal'
                        data-bs-target='#editModal'
                        onClick={() => setEditItem({ jobId, jobName, jobPriority })}>
                        <GrEdit size={18} />
                      </span>
                      <span
                        className='listIcon badge text-bg-danger'
                        style={{ cursor: `pointer` }}
                        data-bs-toggle='modal'
                        data-bs-target='#deleteModal'
                        onClick={() => setDeleteItemId(jobId)}>
                        <RiDeleteBin5Fill size={18} />
                      </span>
                    </td>
                  </tr>
                ))}
              {currentDataRegular
                .sort((a, b) => {
                  return ("" + a.jobName).localeCompare(b.jobName);
                })
                .map(({ jobId, jobName, jobPriority }) => (
                  <tr key={jobId}>
                    <td>{jobName}</td>
                    <td>
                      <span
                        className='badge'
                        style={{
                          fontSize: "17px",
                          width: "40%",
                          minWidth: "87px",
                          color: "black",
                          border: "none",
                          backgroundColor:
                            jobPriority === "Regular" ? "yellow" : jobPriority === "Urgent" ? "red" : "blue",
                        }}>
                        {jobPriority}
                      </span>
                    </td>
                    <td>
                      <span
                        className='listIcon badge text-bg-light'
                        style={{ cursor: `pointer` }}
                        data-bs-toggle='modal'
                        data-bs-target='#editModal'
                        onClick={() => setEditItem({ jobId, jobName, jobPriority })}>
                        <GrEdit size={18} />
                      </span>
                      <span
                        className='listIcon badge text-bg-danger'
                        style={{ cursor: `pointer` }}
                        data-bs-toggle='modal'
                        data-bs-target='#deleteModal'
                        onClick={() => setDeleteItemId(jobId)}>
                        <RiDeleteBin5Fill size={18} />
                      </span>
                    </td>
                  </tr>
                ))}
              {currentDataTrivial
                .sort((a, b) => {
                  return ("" + a.jobName).localeCompare(b.jobName);
                })
                .map(({ jobId, jobName, jobPriority }) => (
                  <tr key={jobId}>
                    <td>{jobName}</td>
                    <td>
                      <span
                        className='badge'
                        style={{
                          fontSize: "17px",
                          width: "40%",
                          minWidth: "87px",
                          color: "black",
                          border: "none",
                          backgroundColor:
                            jobPriority === "Regular" ? "yellow" : jobPriority === "Urgent" ? "red" : "blue",
                        }}>
                        {jobPriority}
                      </span>
                    </td>
                    <td>
                      <span
                        className='listIcon badge text-bg-light'
                        style={{ cursor: `pointer` }}
                        data-bs-toggle='modal'
                        data-bs-target='#editModal'
                        onClick={() => setEditItem({ jobId, jobName, jobPriority })}>
                        <GrEdit size={18} />
                      </span>
                      <span
                        className='listIcon badge text-bg-danger'
                        style={{ cursor: `pointer` }}
                        data-bs-toggle='modal'
                        data-bs-target='#deleteModal'
                        onClick={() => setDeleteItemId(jobId)}>
                        <RiDeleteBin5Fill size={18} />
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      }
      <div className='modal fade' id='deleteModal' tabIndex='-1' aria-labelledby='deleteModalLabel' aria-hidden='true'>
        <div className='modal-dialog modal-dialog-centered'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='deleteModalLabel' style={{ marginLeft: `44%` }}>
                <FaExclamationCircle size={50} />
              </h5>
              <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
            </div>
            <div className='modal-body'>Are you sure you want to delete?</div>
            <div className='modal-footer'>
              <button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>
                Cancel
              </button>
              <button type='button' className='btn btn-danger' data-bs-dismiss='modal' onClick={() => handleDelete()}>
                Approve
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='modal fade' id='editModal' tabIndex='-2' aria-labelledby='editModalLabel' aria-hidden='true'>
        <div className='modal-dialog modal-dialog-centered'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='editModalLabel' style={{ marginLeft: `39%` }}>
                Job Edit
              </h5>
              <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
            </div>
            <div className='modal-body' style={{ padding: `35px`, textAlign: "left" }}>
              <div className='row'>
                <label htmlFor='searchValue2' className='form-label'>
                  Job Name
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='searchValue2'
                  placeholder={editItem.jobName}
                  disabled={true}
                  style={{ width: `94%`, marginLeft: `3%` }}
                />
              </div>
              <div className='row' style={{ marginTop: `39px`, marginBottom: "14px" }}>
                <label htmlFor='priority2' className='form-label'>
                  Job Priority
                </label>
                <div className='dropdown'>
                  <button
                    id='priority2'
                    className='priority btn dropdown-toggle btn-warning'
                    style={{
                      border: "none",
                      backgroundColor:
                        editItem.jobPriority === "Regular"
                          ? "yellow"
                          : editItem.jobPriority === "Urgent"
                          ? "red"
                          : "blue",
                    }}
                    type='button'
                    data-bs-toggle='dropdown'
                    aria-expanded='true'>
                    <span className='dropdownButton'>{editItem.jobPriority || "Trivial"} </span>
                  </button>
                  <ul className='dropdown-menu priority'>
                    {priorities.length > 0 ? (
                      priorities.map((item) => (
                        <li key={item}>
                          <span
                            className={
                              item === "Regular"
                                ? "badge text-bg-warning priorityItem"
                                : item === "Urgent"
                                ? "badge text-bg-danger priorityItem"
                                : "badge text-bg-primary priorityItem"
                            }
                            onClick={() =>
                              setEditItem({
                                jobId: editItem.jobId,
                                jobName: editItem.jobName,
                                jobPriority: item,
                              })
                            }>
                            {item}
                          </span>
                        </li>
                      ))
                    ) : (
                      <li>
                        <span className='badge priorityItem'>
                          <div
                            className='alert alert-danger alertWarn'
                            style={{ fontSize: `16px`, lineHeight: "27px" }}>
                            Please start api <br /> for get priorities!!!
                          </div>
                        </span>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
            <div className='modal-footer'>
              <button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>
                Cancel
              </button>
              <button type='button' className='btn btn-danger' data-bs-dismiss='modal' onClick={() => handleEdit()}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
