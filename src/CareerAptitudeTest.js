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

// 🟢 **LARGE QUESTION BANK (100+ Questions Per Category)**
const fullQuestionBank = [
  { category: "Mechanical & Technical", difficulty: 1, question: "What tool is used to measure electrical current?", options: ["Ammeter", "Voltmeter", "Ohmmeter", "Barometer"], correct: 0 },
  { category: "Mechanical & Technical", difficulty: 2, question: "Which type of simple machine is a ramp?", options: ["Lever", "Inclined Plane", "Pulley", "Wheel & Axle"], correct: 1 },
  { category: "Logical & Analytical", difficulty: 1, question: "What is the next number in the series? 3, 6, 12, 24, ___", options: ["30", "36", "48", "50"], correct: 2 },
  { category: "Logical & Analytical", difficulty: 2, question: "If a train moves at 80mph
