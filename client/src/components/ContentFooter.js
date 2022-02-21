import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setVisibilityFilter,
  visibilityFilter,
  getUncompletedCount,
  getTodosCount,
  error,
} from "../redux/todos/todosSlice";
import { removeCompletedAsync } from "../redux/todos/services";
import { message } from "antd";

const visibility_map = {
  all: "All",
  active: "Active",
  completed: "Completed",
};

const ContentFooter = () => {
  const dispatch = useDispatch();

  const filteredTodos = useSelector(visibilityFilter);
  const uncompletedCount = useSelector(getUncompletedCount);
  const todosCount = useSelector(getTodosCount);

  const handleFilter = (filterType) =>
    dispatch(setVisibilityFilter(visibility_map[filterType]));

  const isVisible = (filterType) => {
    const filter = visibility_map[filterType];
    return filter === filteredTodos;
  };

  const isDisabled = () => todosCount === uncompletedCount;

  const handleRemoveCompleted = async () => {
    await dispatch(removeCompletedAsync());
    !error && message.success("Completed Tasks Removed");
  };

  return (
    <footer className="footer">
      <span className="todo-count">{uncompletedCount} items left</span>
      <ul className="filters">
        <li>
          <span
            onClick={() => handleFilter("all")}
            className={isVisible("all") ? "selected" : ""}
          >
            All
          </span>
        </li>
        <li>
          <span
            onClick={() => handleFilter("active")}
            className={isVisible("active") ? "selected" : ""}
          >
            Active
          </span>
        </li>
        <li>
          <span
            onClick={() => handleFilter("completed")}
            className={isVisible("completed") ? "selected" : ""}
          >
            Completed
          </span>
        </li>
      </ul>
      <button
        disabled={isDisabled()}
        onClick={handleRemoveCompleted}
        className={"clear-completed" + (isDisabled() ? " disabled-button" : "")}
      >
        Clear completed
      </button>
    </footer>
  );
};

export default ContentFooter;
