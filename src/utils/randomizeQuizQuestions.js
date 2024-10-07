function randomizeQuizQuestions(questions, numToPick) {
    // Ensure the number of questions to pick is not more than the available questions
    const numberOfQuestions = Math.min(numToPick, questions.length);

    // Shuffle the questions array to randomize the order
    const shuffledQuestions = [...questions].sort(() => 0.5 - Math.random());

    // Pick the first 'numberOfQuestions' elements from the shuffled array
    return shuffledQuestions.slice(0, numberOfQuestions);
}

export default randomizeQuizQuestions