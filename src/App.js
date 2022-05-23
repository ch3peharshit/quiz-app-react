import { useEffect, useState } from 'react';
import './App.css';
import questionBank from './data';
function App() {
  const [index, setIndex] = useState(0)
  const [question, setQuestion] = useState(questionBank[0])
  const [timeLeft, setTime] = useState(5)
  const [showQuestion, setShowQues] = useState(true)
  const [score, setScore] = useState(0);
  useEffect(() => {
    if (timeLeft > 0) {
      var timer = setInterval(() => { setTime(timeLeft - 1) }, 1000)
      return () => { clearInterval(timer) }
    }
  })
  useEffect(() => {
    if (timeLeft == 0 && index < 2) {
      const newIndex = index + 1;
      setIndex(newIndex)
      setQuestion(questionBank[newIndex])
      setTime(5);
    } else if (timeLeft == 0 && index == 2) {
      setShowQues(false)
    }
  })

  const handleAnswer = (e) => {
    const correctVerdict = e.target.innerText == question.correct
    if (correctVerdict && index < 2) {
      setTime(5);
      setScore(score + 1);
    } else if (correctVerdict && index == 2) {
      if (index == 2) {
        setShowQues(false)
        setTime(0)
        setScore(index + 1)
      }
    } else if (!correctVerdict && index == 2) {
      setShowQues(false)
      setTime(0)
    }
    if (index < 2) {
      const newIndex = index + 1;
      setIndex(newIndex)
      setQuestion(questionBank[newIndex])
    }
  }
  return (
    <div>
      <span style={{ left: '30%', top: '15%', position: 'absolute' }}>Question {question.id} / {questionBank.length}</span>
      <span style={{ left: '63%', top: '15%', position: 'absolute' }}>Time Left 00 : {timeLeft} </span>
      <span style={{ left: '45%', top: '0', position: 'absolute' }}> <h2>Quiz App</h2> </span>

      <div className="rect center">
        {!showQuestion && <div> your score is {score} / {questionBank.length}</div>}
        {showQuestion &&
          <div>
            <h2>{question.text}</h2>
            <div style={{ display: 'flex', flexDirection: "column" }}>
              {question.options.map(option => (
                <>
                  <button key={option.toString()} onClick={(e) => handleAnswer(e)} style={{ width: '100px', marginLeft: "70%", padding: "10px" }}> {option} </button>
                </>
              ))}
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
