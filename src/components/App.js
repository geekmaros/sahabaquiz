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
import randomizeQuizQuestions from "../utils/randomizeQuizQuestions";
import Footer from "./Footer";
import Timer from "./Timer";

const initialState = {
  questions: [],
  allQuestions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemaining: null,
  numberOfQuestionBank: null,
  numberOfUserQuestion: 5,
};

const SECS_PER_QUESTION = 30;

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        allQuestions: action.payload.questions,
        status: "ready",
        numberOfQuestionBank: action.payload.totalNumberOfQuestionBank,
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      const selectedQuestions = randomizeQuizQuestions(state.allQuestions, action.payload);
      return {
        ...state,
        questions: selectedQuestions,
        status: "active",
        numberOfUserQuestion: action.payload,
        secondsRemaining: action.payload * SECS_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points: action.payload === question.correctOption ? state.points + question.points : state.points,
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "finish":
      return {
        ...state,
        status: "finished",
        highScore: state.points > state.highScore ? state.points : state.highScore,
      };
    case "reset":
      return {
        ...state,
        questions: [],
        status: "ready",
        index: 0,
        answer: null,
        points: 0,
        secondsRemaining: null,
        numberOfUserQuestion: 5,
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
      };
    default:
      throw new Error("invalid action");
  }
}

function App() {
  const [
    {
      answer,
      secondsRemaining,
      numberOfUserQuestion,
      numberOfQuestionBank,
      index,
      points,
      questions,
      status,
      highScore,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const maxPossiblePoints = questions.reduce((prev, cur) => prev + cur.points, 0);

  // Fetch all questions when the component mounts
  useEffect(function () {
    fetch("/api/questions")
        .then((res) => res.json())
        .then((data) => {
          const totalNumberOfQuestionBank = data.length;
          dispatch({ type: "dataReceived", payload: { questions: data, totalNumberOfQuestionBank } });
        })
        .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  // useEffect(() => {
  //   if (status === "active" && secondsRemaining > 0) {
  //     const timer = setInterval(() => {
  //       dispatch({ type: "tick" });
  //     }, 1000);
  //
  //     return () => clearInterval(timer);
  //   } else if (secondsRemaining === 0) {
  //     dispatch({ type: "finish" });
  //   }
  // }, [status, secondsRemaining]);

  return (
      <div className="app">
        <Header />
        <Main>
          {status === "loading" && <Loader />}
          {status === "error" && <Error />}
          {status === "ready" && (
              <StartScreen
                  totalNumberOfQuestionBank={numberOfQuestionBank}
                  dispatch={dispatch}
              />
          )}
          {status === "active" && (
              <>
                <Progress
                    answer={answer}
                    index={index}
                    points={points}
                    maxPossiblePoints={maxPossiblePoints}
                    numQuestion={numberOfUserQuestion}
                />
                <Question answer={answer} dispatch={dispatch} questions={questions[index]} />

                <Footer>
                  <Timer secondsRemaining={secondsRemaining} dispatch={dispatch} />
                  <NextButton dispatch={dispatch} index={index} numQuestions={numberOfUserQuestion} answer={answer} />
                </Footer>
              </>
          )}

          {status === "finished" && (
              <FinishScreen dispatch={dispatch} points={points} highScore={highScore} maxPossiblePoints={maxPossiblePoints} />
          )}
        </Main>
      </div>
  );
}

export default App;