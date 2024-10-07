import { useState } from "react";

function StartScreen({ dispatch, totalNumberOfQuestionBank }) {
    // State to track the number of questions the user wants to answer
    const [noOfUserQue, setNoOfUserQue] = useState(5);

    return (
        <div className="start">
            <h2>Welcome to The Sahaba Quiz</h2>


            <h4>
                Get ready to answer {noOfUserQue} questions from our {totalNumberOfQuestionBank} bank from our
                collection to test your knowledge about the noble companions of our beloved Prophet Muhammad (S.A.W).
            </h4>

            <div className={'set'}>
                <p className={'inline'}>Select the number of questions you want to answer (minimum is 5) questions</p>
                <input
                    type="number"
                    min="5"
                    max={totalNumberOfQuestionBank}
                    value={noOfUserQue}
                    onChange={(e) => setNoOfUserQue(Number(e.target.value))}
                />
            </div>

            <button
                onClick={() => dispatch({type: "start", payload: noOfUserQue})}
                className="btn btn-ui"
            >
                Hayyah Binaa 👉
            </button>
        </div>
    );
}

export default StartScreen;