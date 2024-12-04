import React from "react";

export default function BasicTimeline() {
  const experience = [
    {
      role: "Technical Intern (PFA)",
      place: "Caisse de Depot et de Gestion (CDG)",
      url: "#",
      date: "Jul 2024 - Sep 2024",
    },
    {
      role: "Initiation Intern",
      place: "Al Barid Bank (ABB)",
      url: "#",
      date: "Aug 2023 - Sep 2023",
    },
    {
      role: "Social Media Manager",
      place: "Google Developer Student Club (GDSC)",
      url: "#",
      date: "2022 - 2024",
    }
  ];

  return (
    <div>
      <div className="timeline">
        {experience.map((item) => (
          <div className="timeline-item" key={item.date}>
            <div className="job">
              {item.role} |{" "}
              <strong>
                <a href={item.url}>{item.place}</a>
              </strong>
            </div>
            <div className="timeline-date">{item.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
