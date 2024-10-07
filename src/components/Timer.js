import { useEffect } from "react";

function Timer({ dispatch, secondsRemaining }) {
    const mins = Math.floor(secondsRemaining / 60);
    const seconds = secondsRemaining % 60;

    useEffect(() => {
        if (secondsRemaining <= 0) {
            dispatch({ type: "finish" });
            return;
        }

        const id = setInterval(() => {
            dispatch({ type: "tick" });
        }, 1000);

        return () => clearInterval(id);
    }, [secondsRemaining, dispatch]);

    return (
        <div className="timer">
            {mins < 10 && "0"}
            {mins}:{seconds < 10 && "0"}
            {seconds}
        </div>
    );
}

export default Timer;