import React, { useState, useEffect } from "react";
import questionBank from "./full_question_bank.json"; 

const getRandomQuestions = (numQuestions) => {
  if (!questionBank || questionBank.length < numQuestions) {
    console.error("❌ ERROR: Not enough questions in the bank! Using all available.");
    return [...questionBank]; 
  }

  let shuffled = [...questionBank].sort(() => Math.random() - 0.5);
  let selected = shuffled.slice(0, numQuestions);
  console.log("✅ Final Selected Questions Count:", selected.length);
  return selected;
};

const selectedQuestions = getRandomQuestions(100);
console.log("✅ Selected Questions Confirmed:", selectedQuestions.length);

export default function CareerAptitudeTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (index) => {
    if (index === null) return;

    setTimeout(() => {
      console.log("📌 Moving to Next Question:", currentQuestion + 1);
      console.log("📌 Total Questions in Test:", selectedQuestions.length);

      setCurrentQuestion((prev) => {
        if (prev + 1 < 100) { 
          console.log("✅ Question", prev + 2, "loaded.");
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

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <div style={{ backgroundColor: "#f8f9fa", padding: "10px", borderRadius: "5px", marginBottom: "10px" }}>
        <h3>🛠 Debugging Info</h3>
        <p><strong>✅ Total Questions Selected:</strong> {selectedQuestions.length}</p>
        <p><strong>✅ Current Question:</strong> {currentQuestion + 1} / {Math.min(100, selectedQuestions.length)}</p>
        <p><strong>✅ Test Progress:</strong> {progress.toFixed(2)}%</p>
      </div>

      {!showResults ? (
        <div>
          <h2>{selectedQuestions[currentQuestion].question}</h2>
          <div>
            {selectedQuestions[currentQuestion].options.map((option, index) => (
              <button key={index} onClick={() => handleAnswer(index)}>
                {option}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h3>✅ Test Complete!</h3>
        </div>
      )}
    </div>
  );
}
