import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RiAddFill } from "react-icons/ri";
import { getPriorities, createItem } from "../../actions";
import "./style.scss";

const Create = () => {
  const dispatch = useDispatch();
  const priorities = useSelector((state) => state.riseReducer.priorities);

  const [name, setName] = useState("");
  const [priority, setPriority] = useState("Regular");
  const [isWarn, setIsWarn] = useState(false);

  const handleSubmit = () => {
    if (name) {
      setIsWarn(false);
      dispatch(createItem({ name, priority }));
    } else {
      setIsWarn(true);
    }
  };

  useEffect(() => {
    dispatch(getPriorities());
  }, [dispatch]);

  return (
    <div className='containerCreate'>
      <h3>Create New Job</h3>
      <div className='container'>
        <div className='row justify-content-md-center'>
          <div className='col col-lg-8'>
            <label htmlFor='name' className='form-label'>
              Job Name
            </label>
            <input
              type='text'
              className='form-control'
              id='name'
              aria-describedby='isWarn'
              onChange={(e) => {
                setName(e.target.value);
                setIsWarn(false);
              }}
            />
            {isWarn && (
              <div id='isWarn' className='alert alert-danger alertWarn'>
                Please write a job name!!!
              </div>
            )}
          </div>
          <div className='col col-lg-3'>
            <label htmlFor='priority' className='form-label'>
              Job Priority
            </label>
            <div className='dropdown'>
              <button
                className='priority btn dropdown-toggle btn-warning'
                style={{
                  border: "none",
                  backgroundColor: priority === "Regular" ? "yellow" : priority === "Urgent" ? "red" : "blue",
                }}
                type='button'
                data-bs-toggle='dropdown'
                aria-expanded='true'>
                <span className='dropdownButton'>{priority} </span>
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
                        onClick={() => setPriority(item)}>
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
          <div className='col col-lg-1'>
            <label htmlFor='name' className='form-label'>
              Create
            </label>
            <button className='btn btn-primary form-control' id='name' onClick={() => handleSubmit()}>
              <RiAddFill size={23} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
