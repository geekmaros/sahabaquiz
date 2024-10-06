import { useEffect, useReducer } from "react";
import "../App.css";

import Header from "./Header";
import Main from "./Main";

import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "../Progress";
import FinishScreen from "./FinishScreen";

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",

      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
      };
    case "newAnswer":
      const question = state.questions.at(state.index)
      return {
        ...state,
        answer: action.payload,
        points: action.payload === question.correctOption ? state.points + question.points : state.points
      };
    case "nextQuestion":

      return {
        ...state,
       index: state.index + 1,
        answer: null
      };
    case "finish":

      return {
        ...state,
       status: 'finished',
        highScore: state.points > state.highScore ? state.points : state.highScore
      };
    default:
      throw new Error("invalid action");
  }
}

function App() {
  const [{ answer, index, points, questions, status, highScore }, dispatch] = useReducer(reducer, initialState);

  const maxPossiblePoints = questions.reduce((prev, cur) => prev + cur.points, 0)

  const numQuestions = questions.length;

  useEffect(function () {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "dataReceived", payload: data });
      })
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen dispatch={dispatch} numQuestions={numQuestions} />
        )}
        {status === "active" &&(
            <>
              <Progress answer={answer} index={index} points={points} maxPossiblePoints={maxPossiblePoints} numQuestion={numQuestions} />
            <Question answer={answer} dispatch={dispatch}  questions={questions[index]} />
        <NextButton dispatch={dispatch} index={index} numQuestions={numQuestions} answer={answer} />
            </>
            )}

        {status === 'finished' && <FinishScreen points={points} highScore={highScore} maxPossiblePoints={maxPossiblePoints} />}

      </Main>
    </div>
  );
}

export default App;
