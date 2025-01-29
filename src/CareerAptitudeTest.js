import React, { useState, useEffect } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";

const questions = [
  // Placeholder: Will expand to 200+ questions covering various domains
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
  // More questions will be added dynamically
];

export default function CareerAptitudeTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState({});
  const [progress, setProgress] = useState(0);
  const [difficulty, setDifficulty] = useState(1);
  const [timer, setTimer] = useState(30);
  const [careerRecommendations, setCareerRecommendations] = useState(null);
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else {
      handleAnswer(null); // Auto move to next question if time runs out
    }
  }, [timer]);

  const handleAnswer = (index) => {
    const newAnswers = [...answers, index];
    setAnswers(newAnswers);

    const category = questions[currentQuestion].category;
    const questionDifficulty = questions[currentQuestion].difficulty;
    setScore((prevScore) => ({
      ...prevScore,
      [category]: (prevScore[category] || 0) + (index === questions[currentQuestion].correct ? questionDifficulty : 0)
    }));

    if (index === questions[currentQuestion].correct) {
      setDifficulty(Math.min(difficulty + 1, 3));
    } else {
      setDifficulty(Math.max(difficulty - 1, 1));
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setProgress(((currentQuestion + 1) / questions.length) * 100);
      setTimer(30);
    } else {
      generateCareerRecommendations();
    }
  };

  const generateCareerRecommendations = () => {
    const categoryScores = Object.entries(score).map(([category, points]) => ({ category, points }));
    categoryScores.sort((a, b) => b.points - a.points);
    const topCategories = categoryScores.slice(0, 3);

    const recommendations = {
      "Mechanical & Technical Aptitude": "Consider careers in Engineering, Mechanics, Skilled Trades, or Robotics.",
      "Logical & Analytical Thinking": "You may excel in Data Science, Law, Finance, or Cybersecurity.",
      "Verbal & Written Communication": "You have strengths in Journalism, Education, Public Relations, or Legal Consulting."
    };
    
    const bestMatches = topCategories.map(({ category }) => recommendations[category] || "Explore multiple career paths based on your skills.");
    setCareerRecommendations(bestMatches.join(" \n "));
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <Card>
        <CardContent>
          <h2 className="text-xl font-bold mb-4">{questions[currentQuestion].question}</h2>
          <Progress value={progress} className="mb-4" />
          <p className="text-sm text-gray-600">Time Left: {timer}s</p>
          <div className="space-y-2">
            {questions[currentQuestion].options.map((option, index) => (
              <Button
                key={index}
                className="w-full"
                onClick={() => handleAnswer(index)}
              >
                {option}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
      {careerRecommendations && (
        <div className="mt-6 p-4 bg-green-100 rounded">
          <h3 className="text-lg font-semibold">Career Recommendations:</h3>
          <p>{careerRecommendations}</p>
        </div>
      )}
    </div>
  );
}
