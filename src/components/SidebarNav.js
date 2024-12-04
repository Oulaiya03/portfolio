import React from "react";
import { Sidenav } from "rsuite";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import TwitterIcon from "@material-ui/icons/Twitter";

import "../styles/SidebarNav.css";
import "react-typist/dist/Typist.css";
import FadeInSection from "./FadeInSection";

const isMobile = window.innerWidth < 600;

class SidebarNav extends React.Component {
  constructor() {
    super();
    this.state = {
      expanded: true,
      activeKey: "1",
    };
    this.handleSelect = this.handleSelect.bind(this);
  }
  handleSelect(eventKey) {
    this.setState({
      activeKey: eventKey,
    });
  }
  render() {
    const { expanded } = this.state;

    const links = [
      <a href="#intro">$ Intro</a>,
      <a href="#about">$ About me</a>,
      <a href="#experience">$ Experience</a>,
      <a href="#projects">$ Personal Projects</a>,
    ];

    return (
      <div className="sidebar-nav">
        {!isMobile && (
          <Sidenav
            expanded={expanded}
            defaultOpenKeys={["3", "4"]}
            activeKey={this.state.activeKey}
            onSelect={this.handleSelect}
            appearance={"subtle"}
          >
            <Sidenav.Body>
              <div className="sidebar-links">
                {links.map((link, i) => (
                  <FadeInSection delay={`${i + 1}00ms`}>
                    <div>{link}</div>
                  </FadeInSection>
                ))}
              </div>
            </Sidenav.Body>
          </Sidenav>
        )}
        <div className="sidebar-logos" href="/">
          <a href="https://github.com/Oulaiya03">
            <GitHubIcon style={{ fontSize: 19 }} />
          </a>
          <a href="https://www.linkedin.com/in/oulaiya-gaddari-101ba1256/">
            <LinkedInIcon style={{ fontSize: 21 }} />
          </a>
          <a href="#">
            <TwitterIcon style={{ fontSize: 21 }} />
          </a>
        </div>
      </div>
    );
  }
}

export default SidebarNav;
