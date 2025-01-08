import React, { useState, useEffect, useRef } from "react";
import "./Dashboard.css";

const initialCardsData = [
  {
    id: 1,
    name: "Alex Johnson",
    image: "https://source.unsplash.com/300x200/?people,portrait",
    skills: ["Leadership", "Finance", "Marketing"],
    experience: "5 years as a startup founder",
  },
  {
    id: 2,
    name: "Samantha Lee",
    image: "https://source.unsplash.com/300x200/?people,portrait",
    skills: ["Technical Expertise", "AI/ML", "Product Development"],
    experience: "3 years as a CTO",
  },
  {
    id: 3,
    name: "Michael Chen",
    image: "https://source.unsplash.com/300x200/?people,portrait",
    skills: ["Design Thinking", "UX/UI", "Brand Strategy"],
    experience: "4 years as a Creative Director",
  },
];

const Dashboard = ({ profiles = [], setSavedApplications }) => {
  const [cards, setCards] = useState(initialCardsData);
  const [swipeFeedback, setSwipeFeedback] = useState("");
  const cardRefs = useRef([]);

  useEffect(() => {
    if (Array.isArray(profiles) && profiles.length > 0) {
      setCards((prevCards) => [...prevCards, ...profiles]);
    }
  }, [profiles]);

  const handleDrag = (event, cardId) => {
    const card = cardRefs.current[cardId];
    if (!card) return;

    const shiftX = event.clientX - card.startX;
    const shiftY = event.clientY - card.startY;

    card.style.transform = `translate(${shiftX}px, ${shiftY}px) rotate(${shiftX / 20}deg)`;
    card.shiftX = shiftX;

    if (shiftX > 150) {
      setSwipeFeedback("Accepted");
    } else if (shiftX < -150) {
      setSwipeFeedback("Rejected");
    } else {
      setSwipeFeedback("");
    }
  };

  const handleRelease = (cardId) => {
    const card = cardRefs.current[cardId];
    if (!card) return;

    if (Math.abs(card.shiftX) > 150) {
      if (card.shiftX > 0) {
        const savedCard = cards.find((c) => c.id === cardId);
        setSavedApplications((prev) => [...prev, savedCard]);
      }

      card.style.transition = "transform 0.3s ease";
      card.style.transform = `translate(${card.shiftX > 0 ? 500 : -500}px, ${
        card.shiftY || 0
      }px) rotate(${card.shiftX / 10}deg)`;
      setTimeout(() => {
        setCards((prev) => prev.filter((c) => c.id !== cardId));
      }, 300);
    } else {
      card.style.transition = "transform 0.3s ease";
      card.style.transform = "translate(0, 0) rotate(0deg)";
    }
    setSwipeFeedback("");
  };

  const handleMouseDown = (event, cardId) => {
    const card = cardRefs.current[cardId];
    if (!card) return;

    card.startX = event.clientX;
    card.startY = event.clientY;

    const handleMouseMove = (e) => handleDrag(e, cardId);
    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      handleRelease(cardId);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div className="dashboard">
      {swipeFeedback && (
        <div className={`feedback ${swipeFeedback.toLowerCase()}`}>
          {swipeFeedback}
        </div>
      )}
      {cards && cards.length > 0 ? (
        cards.map((card, index) => (
          <div
            key={card.id}
            ref={(el) => (cardRefs.current[card.id] = el)}
            className={`card ${index === cards.length - 1 ? "top-card" : ""}`}
            onMouseDown={(e) => handleMouseDown(e, card.id)}
          >
            <img
              src={card.image}
              alt={`${card.name}'s profile`}
              className="card-image"
            />
            <div className="card-content">
              <h2>{card.name}</h2>
              <h4>Skills:</h4>
              <ul>
                {card.skills.map((skill, idx) => (
                  <li key={idx}>{skill}</li>
                ))}
              </ul>
              <h4>Past Experience:</h4>
              <p>{card.experience}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No cards available</p>
      )}
    </div>
  );
};

export default Dashboard;
