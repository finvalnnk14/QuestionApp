import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import './styles.css';

function Home(props) {
  const navigate = useNavigate();
  const triviaData = props.data;
  const [showResult, setShowResult] = useState(false);
  const [allPossibleAnswers, setAllPossibleAnswers] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answerCorrect, setAnswerCorrect] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [result, setResult] = useState({ correctAnswer: 0, wrongAnswer: 0, totalAnswer: 0 });
  const [timer, setTimer] = useState("00:00");
  const Ref = useRef(null);
  const hasAlerted = useRef(false); // Track if the alert has been shown

  useEffect(() => {
    if (Cookies.get("firebase_token")) {
      combineAllAnswers();
      if (showResult === false) {
        clearTimer(getDateTime());
      }
    } else {
      navigate("/login");
    }

    // Function to handle text selection
    const handleTextSelection = () => {
      if (window.getSelection().toString() && !hasAlerted.current) {
        alert("Dilarang berbuat curang");
        hasAlerted.current = true;
      }
    };

    // Add event listener for text selection
    document.addEventListener('mouseup', handleTextSelection);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener('mouseup', handleTextSelection);
    };
  }, [props.data, navigate, showResult]);

  function combineAllAnswers() {
    let allAnswers = [];
    let correctAnswer = triviaData[currentQuestion]?.correct_answer;
    triviaData[currentQuestion]?.incorrect_answers.forEach((answer) => { allAnswers.push(answer) });
    allAnswers.push(correctAnswer);
    allAnswers.sort(() => Math.random() - 0.5);
    setAllPossibleAnswers(allAnswers);
  }

  function removeCharacters(question) {
    if (!question) return;
    return question.replace(/(&quot\;)/g, "\"")
                  .replace(/(&rsquo\;)/g, "\"")
                  .replace(/(&#039\;)/g, "\'")
                  .replace(/(&amp\;)/g, "\"");
  }

  function clickAnswer(answer, index) {
    const isCorrect = answer === triviaData[currentQuestion].correct_answer;
    setAnswerCorrect(isCorrect);
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion]: { answer, index, isCorrect }
    }));
  }

  function handleNextQuestion() {
    if (currentQuestion < triviaData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      combineAllAnswers();
    } else {
      setShowResult(true);
      calculateResults();
    }
  }

  function handlePreviousQuestion() {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      combineAllAnswers();
    }
  }

  function calculateResults() {
    const correctAnswers = Object.values(selectedAnswers).filter(answer => answer.isCorrect).length;
    const wrongAnswers = Object.values(selectedAnswers).length - correctAnswers;
    setResult({
      correctAnswer: correctAnswers,
      wrongAnswer: wrongAnswers,
      totalAnswer: Object.values(selectedAnswers).length
    });
  }

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    return { total, minutes, seconds };
  }

  const startTimer = (e) => {
    let { total, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      setTimer((minutes > 9 ? minutes : '0' + minutes) + ':' + (seconds > 9 ? seconds : '0' + seconds));
    } else {
      setShowResult(true);
    }
  }

  const clearTimer = (e) => {
    setTimer("15:00");
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => { startTimer(e) }, 1000);
    Ref.current = id;
  }

  const getDateTime = () => {
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 900);
    return deadline;
  }

  function handleQuestionChange(index) {
    if (index === currentQuestion || (index < currentQuestion && selectedAnswers[index])) {
      setCurrentQuestion(index);
      combineAllAnswers();
    } else {
      alert("Anda harus menjawab soal sebelumnya terlebih dahulu");
    }
  }

  return (
    <div className="w-full flex flex-col items-center relative">
      <h1 style={{ fontSize: '70px', margin: '20px 0' }}>Question App</h1>

      {/* Number Grid */}
      <div className="grid-container">
        {triviaData.map((_, index) => (
          <div
            key={index + 1}
            className={`cell ${currentQuestion === index ? 'active' : ''} ${selectedAnswers[index] ? 'answered' : ''}`}
            data-number={index + 1}
            onClick={() => handleQuestionChange(index)}
          >
            {index + 1}
          </div>
        ))}
      </div>

      {/* Information about the current question */}
      <div className="question-info">
        <div className="question-timer">
          <div className="question">
            Question {(currentQuestion >= 9 ? (currentQuestion + 1) : '0' + (currentQuestion + 1))}<span className="text-blue-600">/</span><span className="text-zinc-400 text-base">{triviaData.length}</span>
          </div>
          <div className="timer">
            {!showResult ? (
              <div>{timer}</div>
            ) : (
              <div className="text-green-500">Finished</div>
            )}
          </div>
        </div>
      </div>

      <div className="container">
        {!showResult ? (
          <div className="header">
            <div className="flex flex-col space-y-6">
              <h2 className="text-lg">{removeCharacters(triviaData[currentQuestion]?.question)}</h2>
              <ul className="flex flex-col space-y-3 list-none">
                {allPossibleAnswers.map((answer, index) => (
                  <li
                    onClick={() => clickAnswer(answer, index)}
                    className={`answer-option cursor-pointer py-2 px-3 rounded-lg bg-zinc-800 hover:bg-blue-400 flex flex-row items-center space-x-3 ${selectedAnswers[currentQuestion]?.index === index ? 'selected' : ''}`}
                    key={index}
                  >
                    <div className="circle">
                      {selectedAnswers[currentQuestion]?.index === index && (
                        <div className="small-circle"></div>
                      )}
                    </div>
                    <div className="w-8 h-8 flex items-center justify-center bg-blue-500 text-white rounded-sm">
                      {String.fromCharCode(97 + index)}  {/* This will render 'a', 'b', 'c', 'd' */}
                    </div>
                    <span className="text-white">{answer}</span>
                  </li>
                ))}
              </ul>
              <div className="flex space-x-4">
                {currentQuestion > 0 && (
                  <button onClick={handlePreviousQuestion} className="back-button py-2 px-4 bg-gray-500 text-white rounded-lg">Back</button>
                )}
                <button onClick={handleNextQuestion} className="next-button py-2 px-4 bg-blue-500 text-white rounded-lg">Next</button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col w-5/12 rounded-xl bg-zinc-900 p-8 h-fit">
            <h2 className="items-center text-xl font-bold flex flex-row justify-between py-4 border-b border-zinc-800">
              <span>Total Answer</span>
              <span className="text-blue-500">{result.totalAnswer}</span>
            </h2>
            <h2 className="items-center text-xl font-bold flex flex-row justify-between py-4 border-b border-zinc-800">
              <span>Correct Answer</span>
              <span className="text-blue-500">{result.correctAnswer}</span>
            </h2>
            <h2 className="items-center text-xl font-bold flex flex-row justify-between py-4">
              <span>Wrong Answer</span>
              <span className="text-blue-500">{result.wrongAnswer}</span>
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
