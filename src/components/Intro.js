import React from "react";

import "../styles/Intro.css";
import Typist from "react-typist";
import "react-typist/dist/Typist.css";
import EmailRoundedIcon from "@material-ui/icons/EmailRounded";
import FadeInSection from "./FadeInSection";

export default function Intro() {
  return (
    <div id="intro">
      <Typist avgTypingDelay={120}>
        <span className="intro-title">
          {"Hello! I'm "}
          <span className="intro-name">{"Oulaiya."}</span>
        </span>
      </Typist>
      <FadeInSection>
        <div className="intro-subtitle">Engineering Student passionate about Data & AI.</div>
        <div className="intro-desc">
          I'm a Digital Engineering student specializing in Data Science and Artificial Intelligence 
          at ENSAM Rabat.
          <div style={{ marginTop: "10px" }}>
            Looking forward to connecting! {" "}
            <span className="wave" role="img" aria-label="wave">
              👋
            </span>
          </div>
        </div>
        <a href="mailto:oulaiya2003@gmail.com" className="intro-contact">
          <EmailRoundedIcon />
          {" Get in touch"}
        </a>
      </FadeInSection>
    </div>
  );
}
