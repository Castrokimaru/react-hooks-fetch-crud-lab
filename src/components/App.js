import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    const response = await fetch("http://localhost:4000/questions");
    const data = await response.json();
    setQuestions(data);
  };

  const addQuestion = async (newQuestion) => {
    const response = await fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newQuestion),
    });
    const addedQuestion = await response.json();
    setQuestions([...questions, addedQuestion]);
  };

  const deleteQuestion = async (id) => {
    await fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    });
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const updateQuestion = (id, correctIndex) => {
    const question = questions.find((q) => q.id === id);
    if (question) {
      const updatedQuestion = { ...question, correctIndex };
      setQuestions(questions.map(q => q.id === id ? updatedQuestion : q));
    }
  };

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm addQuestion={addQuestion} />
      ) : (
        <QuestionList
          questions={questions}
          deleteQuestion={deleteQuestion}
          updateQuestion={updateQuestion}
        />
      )}
    </main>
  );
}

export default App;
