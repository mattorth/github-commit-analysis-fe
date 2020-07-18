import React, { useContext, useEffect } from "react";
import axios from "axios";
import { useAppState } from '../context/app-state-context';

import RepoListContext from "../context/RepoListContext";
 
function ToggleStarred(repository) {
  const {
    // state: { token, repositories, activeItem },
    state: { token }
  } = useAppState();

  const { refresh, setRefresh } = useContext(RepoListContext);
 
  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation() 
    console.log("this is refresh", refresh);
    const update = 
      {
        "update": !repository.repository.isStarred,
        "repoId": repository.repository.id
    }
    console.log(repository.repository.isStarred)
    axios
      .put(`${process.env.REACT_APP_BACKEND_URL}/repo/starred`, update, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        repository.repository.isStarred = !repository.repository.isStarred;
         e.className = "notStarred";
        console.log(res);
        setRefresh(!refresh)
      })
      .catch((err) => console.log(err));      
  };
 
  return (
    <div>
      {repository.className === "notStarred" ? (
        <i
          onClick={handleSubmit}
          className="fa fa-star icon-md notStarred"
          aria-hidden="true"
        ></i>
      ) : (
        <i
          onClick={handleSubmit}
          className="fa fa-star icon-md star"
          aria-hidden="true"
        ></i>
      )}
    </div>
  );
}
export default ToggleStarred;