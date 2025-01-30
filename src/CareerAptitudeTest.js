import React, { useState, useEffect } from "react";
import questionBank from "./full_question_bank.json"; // Load the JSON file


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

// 🟢 **FULL QUESTION BANK (100 per category)**
const fullQuestionBank = [
  // Mechanical & Technical (100 Questions)
  { category: "Mechanical & Technical", difficulty: 1, question: "What tool measures electrical current?", options: ["Ammeter", "Voltmeter", "Ohmmeter", "Barometer"], correct: 0 },
  { category: "Mechanical & Technical", difficulty: 2, question: "Which simple machine is a ramp?", options: ["Lever", "Inclined Plane", "Pulley", "Wheel & Axle"], correct: 1 },

  // Logical & Analytical (100 Questions)
  { category: "Logical & Analytical", difficulty: 1, question: "What’s next in: 3, 6, 12, 24, ___?", options: ["30", "36", "48", "50"], correct: 2 },
  { category: "Logical & Analytical", difficulty: 2, question: "A train moves at 80mph. Distance in 3.5 hours?", options: ["280 miles", "250 miles", "300 miles", "270 miles"], correct: 0 },

  // Verbal & Written Communication (100 Questions)
  { category: "Verbal & Written", difficulty: 1, question: "What does 'ephemeral' mean?", options: ["Long-lasting", "Temporary", "Powerful", "Unclear"], correct: 1 },

  // Science & Research (100 Questions)
  { category: "Science & Research", difficulty: 1, question: "Which science studies living organisms?", options: ["Physics", "Biology", "Chemistry", "Geology"], correct: 1 },

  // IT & Technology (100 Questions)
  { category: "Technology & IT", difficulty: 1, question: "What does HTML stand for?", options: ["HyperText Markup Language", "HighText Machine Learning", "HyperTransfer Mail Logic", "Home Tool Management Language"], correct: 0 },

  // **Expand with 100 questions per category**
];

const getRandomQuestions = (numQuestions) => {
  let shuffled = [...questionBank].sort(() => Math.random() - 0.5); // Shuffle a copy (not the original)
  return shuffled.length >= numQuestions ? shuffled.slice(0, numQuestions) : shuffled; // Ensure 100 questions
};

const getRandomQuestions = (numQuestions) => {
  let shuffled = [...questionBank].sort(() => Math.random() - 0.5); // Shuffle a copy
  let selected = shuffled.length >= numQuestions ? shuffled.slice(0, numQuestions) : shuffled;
  return selected;
};

const selectedQuestions = getRandomQuestions(100);
console.log("Selected Questions Count:", selectedQuestions.length); // Debugging log



export default function CareerAptitudeTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState({});
  const [progress, setProgress] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [difficulty, setDifficulty] = useState(1);

  const handleAnswer = (index) => {
    if (index === null) return;

    setAnswers((prevAnswers) => [...prevAnswers, index]);

    const category = selectedQuestions[currentQuestion].category;
    const questionDifficulty = selectedQuestions[currentQuestion].difficulty;

    setScore((prevScore) => ({
      ...prevScore,
      [category]: (prevScore[category] || 0) + (index === selectedQuestions[currentQuestion].correct ? questionDifficulty : 0),
    }));

    // 🔄 **Adaptive Difficulty Logic**
    if (index === selectedQuestions[currentQuestion].correct) {
      setDifficulty(Math.min(difficulty + 1, 3)); // Increase difficulty (max 3)
    } else {
      setDifficulty(Math.max(difficulty - 1, 1)); // Decrease difficulty (min 1)
    }

    // **Move to Next Question or Show Results**
  setTimeout(() => {
    console.log("Current Question:", currentQuestion + 1);
    console.log("Total Questions in Test:", selectedQuestions.length);

    setCurrentQuestion((prev) => {
      if (prev + 1 < 100) {  // Forces 100 questions
        return prev + 1;
      } else {
        console.log("Test Completed - Showing Results");
        setShowResults(true);
        return prev;
      }
    });

  setProgress(((currentQuestion + 1) / 100) * 100); // Always base progress on 100 questions
}, 500);

  };

  // 🟢 **Career Recommendations Generator**
  const generateCareerRecommendations = () => {
    const categoryScores = Object.entries(score).map(([category, points]) => ({ category, points }));
    categoryScores.sort((a, b) => b.points - a.points);
    const topCategories = categoryScores.slice(0, 3);

    const recommendations = {
      "Mechanical & Technical": "Consider careers in Engineering, Mechanics, Skilled Trades, or Robotics.",
      "Logical & Analytical": "You may excel in Data Science, Law, Finance, or Cybersecurity.",
      "Verbal & Written": "Your strengths align with Journalism, Education, or Public Relations.",
      "Technology & IT": "Your skills align with careers in Software Development, Cybersecurity, and IT Administration.",
      "Science & Research": "You may thrive in Medicine, Laboratory Research, or Environmental Science."
    };

    return topCategories.map(({ category }) => recommendations[category] || "Explore multiple career paths based on your skills.").join("\n");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
<div style={{ backgroundColor: "#f8f9fa", padding: "10px", borderRadius: "5px", marginBottom: "10px" }}>
  <h3>🛠 Debugging Info</h3>
  <p><strong>Total Questions Selected:</strong> {selectedQuestions.length}</p>
  <p><strong>Current Question Index:</strong> {currentQuestion + 1} / 100</p>
  <p><strong>Test Progress:</strong> {progress.toFixed(2)}%</p>
</div>

      {!showResults ? (
        <Card>
          <CardContent>
            <h2>{selectedQuestions[currentQuestion].question}</h2>
            <Progress value={progress} />
            <div>
              {selectedQuestions[currentQuestion].options.map((option, index) => (
                <Button key={index} onClick={() => handleAnswer(index)}>{option}</Button>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <div style={{ marginTop: "20px", padding: "15px", backgroundColor: "#d4edda", borderRadius: "5px" }}>
          <h3>Career Recommendations:</h3>
          <p>{generateCareerRecommendations()}</p>
        </div>
      )}
    </div>
  );
}
