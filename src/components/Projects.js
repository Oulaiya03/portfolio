import React from "react";
import "../styles/Projects.css";
import FolderOpenRoundedIcon from "@material-ui/icons/FolderOpenRounded";
import GitHubIcon from "@material-ui/icons/GitHub";
import OpenInBrowserIcon from "@material-ui/icons/OpenInBrowser";
import FadeInSection from "./FadeInSection";

const projects = {
  "Sign Language Detection": {
    desc: "Developed ML models for sign language detection and tumor detection using Python, OpenCV, and Mediapipe.",
    techStack: "Python, OpenCV, Mediapipe, Machine Learning",
    link: "#",
  },
  "ENSAMI Chatbot": {
    desc: "Created an intelligent chatbot for ENSAM Rabat website using LangChain and GPT-3.5-turbo.",
    techStack: "LangChain, GPT-3.5, Python, NLP",
    link: "#",
  },
  "VARUS Application": {
    desc: "Mobile application using AI to detect and analyze faults in football, enhancing VAR capabilities.",
    techStack: "Computer Vision, AI, Mobile Development",
    link: "#",
  }
};

export default function Projects() {
  return (
    <div id="projects">
      <div className="section-header ">
        <span className="section-title">$ Projects</span>
      </div>

      <div className="project-container">
        <ul className="projects-grid">
          {Object.keys(projects).map((key, i) => (
            <FadeInSection delay={`${i + 1}00ms`}>
              <li className="projects-card">
                <div className="card-header">
                  <div className="folder-icon">
                    <FolderOpenRoundedIcon
                      style={{ fontSize: 35 }}
                    ></FolderOpenRoundedIcon>
                  </div>
                  <span className="external-links">
                    <a className="github-icon" href={projects[key]["link"]}>
                      <GitHubIcon
                        style={{
                          fontSize: 20,
                          color: "var(--lightest-slate)",
                        }}
                      ></GitHubIcon>
                    </a>
                    {projects[key]["open"] && (
                      <a className="open-icon" href={projects[key]["open"]}>
                        <OpenInBrowserIcon
                          style={{
                            fontSize: 25,
                            color: "var(--lightest-slate)",
                          }}
                        ></OpenInBrowserIcon>
                      </a>
                    )}
                  </span>
                </div>

                <div className="card-title">{key}</div>
                <div className="card-desc">{projects[key]["desc"]}</div>
                <div className="card-tech">{projects[key]["techStack"]}</div>
              </li>
            </FadeInSection>
          ))}
        </ul>
      </div>
    </div>
  );
}
