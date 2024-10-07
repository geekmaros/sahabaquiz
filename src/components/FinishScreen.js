import progress from "../Progress";

function FinishScreen({highScore,dispatch, maxPossiblePoints, points}) {
    const percentage = (points/maxPossiblePoints) * 100

    let emoji;
    if(percentage === 100) emoji = "Maa Shaa Allah🥇"
    if(percentage >=80 && percentage < 100) emoji = "Baraka Llahu fih🥈"
    if(percentage >=50 && percentage < 80) emoji = "Allahuma Barik🤩"
    if(percentage >=0 && percentage < 50) emoji = "Subhana Llah 🤨"
    if(percentage === 0 && percentage < 50) emoji = "Inna liLlahi wa inna ilayhi raajiun 🤦🏽‍♂️"

    return (
      <>
        <p className={"result"}>
          <span>{emoji}</span>You Scored{" "}
          <strong>
            {points} out of possible {maxPossiblePoints} (
            {Math.ceil(percentage)}%)
          </strong>
        </p>
        <p className="highscore">(Highscore: {highScore} points)</p>

          <button onClick={() => dispatch({type: 'reset'})} className={'btn btn-ui'}>Reset Quiz</button>
      </>
    );

}

export default FinishScreen