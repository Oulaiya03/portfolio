import React from "react";
import "../styles/Credits.css";
import FadeInSection from "./FadeInSection";

export default function Credits() {
  return (
    <FadeInSection>
      <div id="credits">
        <div className="ending-credits">
          <div>Made with ♥ by Merouane Zouaid</div>
        </div>
      </div>
    </FadeInSection>
  );
}
