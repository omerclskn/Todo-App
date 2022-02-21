import Header from "./components/Header";
import Footer from "./components/Footer";
import Content from "./components/Content";

function App() {
  return (
    <>
      <section className="todoapp">
        <h1>Todo App</h1>
        <Header />
        <Content />
      </section>
      <Footer />
    </>
  );
}

export default App;
