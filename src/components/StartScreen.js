function StartScreen({dispatch, numQuestions}){
    return (
      <div className="start">
        <h2>Welcome to The Sahaba Quiz</h2>
        <h3>
          {numQuestions} questions to test knowledge about the companions of our Noble
          Prophet (S.A.W)
        </h3>

        <button onClick={() => dispatch({type: "start"})} className="btn btn-ui">Hayyah Binaa</button>
      </div>
    );
}

export default StartScreen;