import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTodosAsync,
  removeTodosAsync,
  toggleTodoAsync,
  updateTodoAsync,
} from "../redux/todos/services";
import { selectVisibilityFilter, setEditTodo } from "../redux/todos/todosSlice";
import MessagePanel from "./MessagePanel";
import { message, Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import useKeypress from "../hooks/useKeyPress";
import classnames from "classnames";

const TodoList = () => {
  const dispatch = useDispatch();
  const displayedTodos = useSelector(selectVisibilityFilter);
  const isLoading = useSelector((state) => state.todos.loading);
  const updateLoading = useSelector((state) => state.todos.updateLoading);
  const [newValue, setNewValue] = useState("");
  const [editId, setEditId] = useState(-1);

  const resetStates = () => {
    setNewValue("");
    setEditId(-1);
  };

  const confirm = async (id) => {
    await dispatch(removeTodosAsync(id));
    editId === id && resetStates();
    message.success("Succesfully Removed");
  };

  const handleEditTodo = ({ id, title, completed }) => {
    if (!completed) {
      dispatch(setEditTodo({ id, editing: true }));
      setNewValue(title);
      setEditId(id);
      message.warning("Esc to exit, Enter to save");
    } else {
      message.warning("Completed Todos cannot be edited");
    }
  };

  const handleExitEdit = ({ id, title }) => {
    dispatch(setEditTodo({ id, editing: false }));
    resetStates();
    message.error("Cancel Editing");
  };

  const handleToggle = async ({ id, completed }) => {
    await dispatch(toggleTodoAsync({ id, data: { completed: !completed } }));
    completed
      ? message.error("Task Uncompleted")
      : message.success("Task Completed");
  };

  useEffect(() => {
    dispatch(getTodosAsync());
  }, [dispatch]);

  useKeypress(
    "Escape",
    () => {
      dispatch(setEditTodo({ id: editId, editing: false }));
      resetStates();
    },
    newValue,
    editId
  );

  useKeypress(
    "Enter",
    async () => {
      if (newValue.trim()) {
        await dispatch(
          updateTodoAsync({ id: editId, data: { title: newValue } })
        );
        resetStates();
      } else {
        message.error("Cannot be empty");
      }
    },
    newValue,
    editId
  );

  if (isLoading || displayedTodos.length === 0)
    return (
      <MessagePanel loading={isLoading} noItem={displayedTodos.length === 0} />
    );

  return (
    <ul className="todo-list">
      {displayedTodos.map((item) => (
        <li
          id="todo-item"
          key={item.id}
          className={classnames({
            completed: item.completed,
            passive: editId !== item.id && editId !== -1,
          })}
        >
          <div className="view">
            <input
              checked={item.completed}
              className="toggle"
              type="checkbox"
              onChange={() => handleToggle(item)}
            />
            {item.editing ? (
              <label>
                <input
                  autoFocus
                  className="edit-input"
                  onChange={(e) => setNewValue(e.target.value)}
                  type="text"
                  value={newValue}
                />
              </label>
            ) : (
              <label>{item.title}</label>
            )}
            {(editId === -1 || editId === item.id) && (
              <Popconfirm
                title="Are you sure to delete this task?"
                onConfirm={() => confirm(item.id)}
                okText="Yes"
                cancelText="No"
              >
                <DeleteOutlined className="destroy" />
              </Popconfirm>
            )}
            {editId === -1 && (
              <div onClick={() => handleEditTodo(item)}>
                <EditOutlined className="edit-todo" />
              </div>
            )}
            {editId === item.id && (
              <div onClick={() => handleExitEdit(item)}>
                <PlusOutlined rotate={45} className="edit-todo" />
              </div>
            )}
          </div>
        </li>
      ))}
      {updateLoading && (
        <div className="spinner-wrapper">
          <div>
            <div className="spinner"></div>
          </div>
        </div>
      )}
    </ul>
  );
};

export default TodoList;
