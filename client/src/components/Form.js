import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleAllAsync,
  untoggleAllAsync,
  addTodoAsync,
} from "../redux/todos/services";
import { message, Tooltip } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";

const Form = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const [isAllChecked, setIsAllChecked] = useState(true);
  const addLoading = useSelector((state) => state.todos.addLoading);

  const handleToggleAll = () => {
    isAllChecked ? dispatch(untoggleAllAsync()) : dispatch(toggleAllAsync());
    isAllChecked
      ? message.success("All todos are checked")
      : message.success("All todos are unchecked");
    setIsAllChecked(!isAllChecked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (value.trim()) {
      await dispatch(addTodoAsync({ title: value }));
      message.success("Todo added successfully");
      setValue("");
    } else {
      message.error("Please finish editing todos");
    }
  };

  return (
    <div className="header-wrapper">
      <div className="tooltip">
        <Tooltip
          color="rgba(0, 0, 0, 0.9)"
          title={
            isAllChecked ? "Mark all as complete" : "Mark all as uncomplete"
          }
        >
          <CaretDownOutlined
            rotate={isAllChecked ? 0 : 180}
            style={{ fontSize: 24 }}
            onClick={handleToggleAll}
          />
        </Tooltip>
      </div>
      <form className="add-form" onSubmit={handleSubmit}>
        <input
          disabled={addLoading}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
        />
        {addLoading && <span>Adding...</span>}
      </form>
    </div>
  );
};

export default Form;
