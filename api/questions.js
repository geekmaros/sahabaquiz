import questions from  "data/questions.json"

export default function handler(req, res) {
    // Send the questions from the local JSON file
    res.status(200).json(questions);
}