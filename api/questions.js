import questions from  "data/questions.json"

export const dynamic = 'force-dynamic'; // static by default, unless reading the request

export default function handler(req, res) {
    // Send the questions from the local JSON file
    res.status(200).json(questions);
}