import Options from "./Options";

function Question({answer, dispatch, questions, index}){
    return (
        <div>
            <h4>{questions.question}</h4>

            <Options answer={answer} dispatch={dispatch} question={questions}/>


        </div>
    )
}


export default Question
