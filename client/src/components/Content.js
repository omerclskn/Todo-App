import React from "react";
import ContentFooter from "./ContentFooter";
import TodoList from "./TodoList";

const Content = () => (
  <section className="main">
    <TodoList />
    <ContentFooter />
  </section>
);

export default Content;
