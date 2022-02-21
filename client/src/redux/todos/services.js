import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl =
  "https://omerclskn-todo-express.netlify.app/.netlify/functions/server";

export const getTodosAsync = createAsyncThunk(
  "todos/getTodosAsync",
  async () => {
    const { data } = await axios(`${baseUrl}/todos`);
    return data;
  }
);

export const addTodoAsync = createAsyncThunk(
  "todos/addTodoAsync",
  async (todo) => {
    const { data } = await axios.post(`${baseUrl}/todos`, todo);
    return data;
  }
);

export const removeTodosAsync = createAsyncThunk(
  "todos/removeTodosAsync",
  async (id) => {
    await axios.delete(`${baseUrl}/todos/${id}`);
    return id;
  }
);

export const toggleTodoAsync = createAsyncThunk(
  "todos/toggleTodoAsync",
  async ({ id, data }) => {
    await axios.patch(`${baseUrl}/todos/${id}`, data);
    return id;
  }
);

export const removeCompletedAsync = createAsyncThunk(
  "todos/removeCompleted",
  async () => {
    const { data } = await axios(`${baseUrl}/todos/removeCompleted`);
    return data;
  }
);
export const untoggleAllAsync = createAsyncThunk(
  "todos/toggleAll",
  async () => {
    const { data } = await axios(`${baseUrl}/todos/toggleAll`);
    return data;
  }
);
export const toggleAllAsync = createAsyncThunk(
  "todos/untoggleAll",
  async () => {
    const { data } = await axios(`${baseUrl}/todos/untoggleAll`);
    return data;
  }
);
export const updateTodoAsync = createAsyncThunk(
  "todos/updateTodo",
  async ({ id, data }) => {
    const res = await axios.patch(`${baseUrl}/todos/updateTodo/${id}`, data);
    return res.data;
  }
);
