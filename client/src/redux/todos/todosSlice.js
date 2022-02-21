import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";

import {
  getTodosAsync,
  addTodoAsync,
  removeTodosAsync,
  toggleTodoAsync,
  removeCompletedAsync,
  toggleAllAsync,
  untoggleAllAsync,
  updateTodoAsync,
} from "./services";

export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
    loading: false,
    addLoading: false,
    updateLoading: false,
    error: false,
    visibilityFilter: "All",
  },
  reducers: {
    setVisibilityFilter: (state, action) => {
      state.visibilityFilter = action.payload;
    },
    setEditTodo: (state, action) => {
      state.items = state.items.map((item) => {
        if (item.id === action.payload.id) {
          item.editing = action.payload.editing;
        }
        return item;
      });
    },
  },
  extraReducers: {
    // get todos
    [getTodosAsync.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.loading = false;
    },
    [getTodosAsync.rejected]: (state, action) => {
      message.error(action.error.message);
      state.error = action.error.message;
      state.loading = false;
    },
    [getTodosAsync.pending]: (state, action) => {
      state.loading = true;
    },
    // add todos
    [addTodoAsync.fulfilled]: (state, action) => {
      state.items.push(action.payload);
      state.addLoading = false;
    },
    [addTodoAsync.rejected]: (state, action) => {
      message.error(action.error.message);
      state.error = action.error.message;
      state.addLoading = false;
    },
    [addTodoAsync.pending]: (state, action) => {
      state.addLoading = true;
    },
    // remove todos
    [removeTodosAsync.fulfilled]: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.updateLoading = false;
    },
    [removeTodosAsync.rejected]: (state, action) => {
      message.error(action.error.message);
      state.error = action.error.message;
      state.updateLoading = false;
    },
    [removeTodosAsync.pending]: (state, action) => {
      state.updateLoading = true;
    },
    // toggle todos
    [toggleTodoAsync.fulfilled]: (state, action) => {
      state.items = state.items.map((item) => {
        if (item.id === action.payload) {
          item.completed = !item.completed;
        }
        return item;
      });
      state.updateLoading = false;
    },
    [toggleTodoAsync.rejected]: (state, action) => {
      message.error(action.error.message);
      state.error = action.error.message;
      state.updateLoading = false;
    },
    [toggleTodoAsync.pending]: (state, action) => {
      state.updateLoading = true;
    },
    // remove completed
    [removeCompletedAsync.fulfilled]: (state, action) => {
      state.items = state.items.filter((item) => !item.completed);
      state.updateLoading = false;
    },
    [removeCompletedAsync.rejected]: (state, action) => {
      message.error(action.error.message);
      state.error = action.error.message;
      state.updateLoading = false;
    },
    [removeCompletedAsync.pending]: (state, action) => {
      state.updateLoading = true;
    },
    // toggle all
    [toggleAllAsync.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.updateLoading = false;
    },
    [toggleAllAsync.rejected]: (state, action) => {
      message.error(action.error.message);
      state.error = action.error.message;
      state.updateLoading = false;
    },
    [toggleAllAsync.pending]: (state, action) => {
      state.updateLoading = true;
    },
    // untoggle all
    [untoggleAllAsync.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.updateLoading = false;
    },
    [untoggleAllAsync.rejected]: (state, action) => {
      message.error(action.error.message);
      state.error = action.error.message;
      state.updateLoading = false;
    },
    [untoggleAllAsync.pending]: (state, action) => {
      state.updateLoading = true;
    },
    // update todos
    [updateTodoAsync.fulfilled]: (state, action) => {
      state.items = state.items.map((item) => {
        if (item.id === action.payload.id) {
          item.title = action.payload.title;
          item.editing = false;
        }
        return item;
      });
      state.updateLoading = false;
    },
    [updateTodoAsync.rejected]: (state, action) => {
      message.error(action.error.message);
      state.error = action.error.message;
      state.updateLoading = false;
    },
    [updateTodoAsync.pending]: (state, action) => {
      state.updateLoading = true;
    },
  },
});

export const hasEditingTodo = (state) => state.todos.hasEditingTodo;

export const visibilityFilter = (state) => state.todos.visibilityFilter;

export const getUncompletedCount = (state) =>
  state.todos.items.filter((item) => item.completed === false).length;

export const getTodosCount = (state) => state.todos.items.length;

export const selectVisibilityFilter = (state) => {
  switch (state.todos.visibilityFilter) {
    case "All":
      return state.todos.items;
    case "Completed":
      return state.todos.items.filter((item) => item.completed === true);
    case "Active":
      return state.todos.items.filter((item) => item.completed === false);
    default:
      return state.todos.items;
  }
};

export default todosSlice.reducer;
export const { setVisibilityFilter, setEditTodo } = todosSlice.actions;
