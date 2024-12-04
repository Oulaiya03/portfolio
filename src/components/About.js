import React from "react";
import "../styles/About.css";
import FadeInSection from "./FadeInSection";

export default function About() {
  const tech_stack = [
    "Python",
    "R",
    "Java",
    "SQL",
    "JavaScript",
    "C/C++",
    "Power BI",
    "OpenCV",
    "LangChain",
    "Streamlit",
    "Git",
    "Mediapipe"
  ];

  return (
    <div id="about" >
      <FadeInSection>
        <div style={{ marginTop: "10px" }} className="section-header">
          <span className="section-title">$ About me</span>
        </div>
        <div className="about-content">
          <div className="about-description">
            <p>
              I am a Digital Engineering student at the National School of Arts and Crafts (ENSAM-R) 
              in Rabat, specializing in Data Science and Artificial Intelligence. I am also co-founder of <a href="https://www.instagram.com/alts.morocco" target="_blank" rel="noopener noreferrer">ALTs Morocco</a>.
            </p>
            {"Here are some technologies I've been working with:"}
            <ul className="tech-stack">
              {tech_stack.map((tech_item) => (
                <li key={tech_item}>{tech_item}</li>
              ))}
            </ul>
            <p>
              I'm particularly interested in Machine Learning, Natural Language Processing, 
              and Computer Vision. I've worked on various projects including sign language 
              detection, intelligent chatbots, and sports analytics applications.
            </p>
            <p>
              When I'm not coding, I'm actively involved in student organizations and 
              participating in hackathons and tech competitions.
            </p>
          </div>
        </div>
      </FadeInSection>
    </div>
  );
}
