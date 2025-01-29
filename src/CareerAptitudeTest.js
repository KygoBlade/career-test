import React, { useState, useEffect } from "react";

function Card({ children }) {
  return <div style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "8px", backgroundColor: "#fff" }}>{children}</div>;
}

function CardContent({ children }) {
  return <div>{children}</div>;
}

function Button({ children, onClick }) {
  return (
    <button
      style={{
        width: "100%",
        padding: "12px",
        margin: "8px 0",
        cursor: "pointer",
        background: "#007BFF",
        color: "#FFF",
        border: "none",
        borderRadius: "5px",
        fontSize: "16px",
        transition: "background 0.2s ease-in-out",
      }}
      onClick={onClick}
      onMouseOver={(e) => (e.target.style.background = "#0056b3")}
      onMouseOut={(e) => (e.target.style.background = "#007BFF")}
    >
      {children}
    </button>
  );
}

function Progress({ value }) {
  return (
    <div style={{ width: "100%", background: "#ddd", borderRadius: "5px", margin: "10px 0" }}>
      <div style={{ width: `${value}%`, height: "10px", background: "green", borderRadius: "5px" }}></div>
    </div>
  );
}

// 🟢 **Questions Set**
const questions = [
  {
    category: "Mechanical & Technical Aptitude",
    difficulty: 1,
    question: "When you turn a wrench clockwise, what happens to the bolt?",
    options: [
      "It tightens",
      "It loosens",
      "It depends on the type of bolt",
      "It does nothing"
    ],
    correct: 0,
    type: "multiple-choice"
  },
  {
    category: "Logical & Analytical Thinking",
    difficulty: 1,
    question: "What is the next number in the sequence? 2, 4, 8, 16, __?",
    options: ["24", "32", "40", "48"],
    correct: 1,
    type: "multiple-choice"
  },
  {
    category: "Verbal & Written Communication",
    difficulty: 1,
    question: "Which of the following words is a synonym for 'elated'?",
    options: ["Sad", "Happy", "Angry", "Confused"],
    correct: 1,
    type: "multiple-choice"
  }
];

export default function CareerAptitudeTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState({});
  const [progress, setProgress] = useState(0);
  const [timer, setTimer] = useState(30);
  const [showResults, setShowResults] = useState(false);

  // 🟢 **TIMER FUNCTION**
  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else {
      handleAnswer(null); // Auto move to next question if time runs out
    }
  }, [timer]);

  // 🟢 **Button Click Function (With `alert()` Debugging)**
  const handleAnswer = (index) => {
    if (index === null) return;

    alert(`Current Question: ${currentQuestion}`); // 🔥 Debugging: Shows current question before updating

    setAnswers((prevAnswers) => [...prevAnswers, index]);

    const category = questions[currentQuestion].category;
    const questionDifficulty = questions[currentQuestion].difficulty;

    setScore((prevScore) => ({
      ...prevScore,
      [category]: (prevScore[category] || 0) + (index === questions[currentQuestion].correct ? questionDifficulty : 0),
    }));

    setTimeout(() => {
      setCurrentQuestion((prev) => {
        alert(`Next Question: ${prev + 1}`); // 🔥 Debugging: Shows next question index

        if (prev < questions.length - 1) {
          return prev + 1;
        } else {
          setShowResults(true);
          alert("Showing results now."); // 🔥 Debugging: Shows when results appear
          return prev;
        }
      });

      setProgress(((currentQuestion + 1) / questions.length) * 100);
      setTimer(30);
    }, 500);
  };

  // 🟢 **Career Recommendations Function**
  const generateCareerRecommendations = () => {
    const categoryScores = Object.entries(score).map(([category, points]) => ({ category, points }));
    categoryScores.sort((a, b) => b.points - a.points);
    const topCategories = categoryScores.slice(0, 3);

    const recommendations = {
      "Mechanical & Technical Aptitude": "Consider careers in Engineering, Mechanics, Skilled Trades, or Robotics.",
      "Logical & Analytical Thinking": "You may excel in Data Science, Law, Finance, or Cybersecurity.",
      "Verbal & Written Communication": "You have strengths in Journalism, Education, Public Relations, or Legal Consulting."
    };

    return topCategories.map(({ category }) => recommendations[category] || "Explore multiple career paths based on your skills.").join("\n");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      {!showResults ? (
        <Card>
          <CardContent>
            <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "10px" }}>
              {questions[currentQuestion].question}
            </h2>
            <Progress value={progress} />
            <p style={{ fontSize: "14px", color: "#666" }}>Time Left: {timer}s</p>
            <div>
              {questions[currentQuestion].options.map((option, index) => (
                <Button key={index} onClick={() => handleAnswer(index)}>
                  {option}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <div style={{ marginTop: "20px", padding: "15px", backgroundColor: "#d4edda", borderRadius: "5px" }}>
          <h3 style={{ fontSize: "18px", fontWeight: "bold" }}>Career Recommendations:</h3>
          <p>{generateCareerRecommendations()}</p>
        </div>
      )}
    </div>
  );
}
