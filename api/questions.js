import ques from  "data/questions.json"

export default function questions(req, res) {
    res.statusCode = 200;
    const data = ques
    res.json({ data });
}