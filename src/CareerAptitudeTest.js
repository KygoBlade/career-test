import React, { useState, useEffect } from "react";
import questionBank from "./full_question_bank.json"; // Load the full question bank from JSON

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

// ✅ Ensure 100 questions are selected properly
const getRandomQuestions = (numQuestions) => {
  if (!questionBank || questionBank.length < numQuestions) {
    console.error("❌ ERROR: Not enough questions in the bank!");
    return [];
  }
  
  let shuffled = [...questionBank].sort(() => Math.random() - 0.5);
  let selected = shuffled.slice(0, numQuestions);
  
  console.log("✅ Final Selected Questions Count:", selected.length); // Debugging log
  return selected;
};

const selectedQuestions = getRandomQuestions(100);
console.log("✅ Selected Questions Confirmed:", selectedQuestions.length);

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
        if (prev + 1 < selectedQuestions.length) {  // Uses actual length
          return prev + 1;
        } else {
          console.log("✅ Test Completed - Showing Results");
          setShowResults(true);
          return prev;
        }
      });

      setProgress(((currentQuestion + 1) / 100) * 100);
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
      {/* Debugging Info on Screen */}
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
