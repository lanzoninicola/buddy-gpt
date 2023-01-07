import { default as CodingQuestionList } from "./components/coding-questions/list/list";

function App() {
  return (
    <>
      {process.env.NODE_ENV === "development" && (
        <form action="post">
          <label htmlFor="foo">Foo</label>
          <textarea name="foo" id="foo" cols={30} rows={10}></textarea>
        </form>
      )}
      <CodingQuestionList />
    </>
  );
}

export default App;
