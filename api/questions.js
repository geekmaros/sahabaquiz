import ques from  "data/questions.json"

export default function questions(req, res) {
    res.statusCode = 200;
    const data = ques
    console.log(data)
    res.json({ data });
}