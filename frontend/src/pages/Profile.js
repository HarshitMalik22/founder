import React, { useState } from 'react';
import './Profile.css';

const Profile = ({ setProfiles }) => {
  const [formData, setFormData] = useState({
    githubUsername: '',
    technicalSkills: '',
    professionalExperience: '',
    preferredCompensation: '',
    portfolioURL: '',
    whatsappNumber: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProfile = {
      id: Date.now(), // Unique ID for each profile
      name: formData.githubUsername || 'New User',
      image: 'https://source.unsplash.com/300x200/?profile,avatar', // Default image URL
      skills: formData.technicalSkills ? formData.technicalSkills.split(',').map(skill => skill.trim()) : [],
      experience: formData.professionalExperience || 'No experience provided'
    };

    // Update profiles
    setProfiles(prevProfiles => [...prevProfiles, newProfile]);

    // Clear form fields
    setFormData({
      githubUsername: '',
      technicalSkills: '',
      professionalExperience: '',
      preferredCompensation: '',
      portfolioURL: '',
      whatsappNumber: ''
    });
  };

  return (
    <div className="profile-container">
      <h1>Welcome</h1>
      <p>You are logged in as a Founder</p>
      <form className="profile-form" onSubmit={handleSubmit}>
        <label>
          GitHub Username
          <input
            type="text"
            name="githubUsername"
            placeholder="your-github-username"
            value={formData.githubUsername}
            onChange={handleChange}
          />
        </label>

        <label>
          Technical Skills
          <input
            type="text"
            name="technicalSkills"
            placeholder="e.g., React, Node.js, AWS (comma separated)"
            value={formData.technicalSkills}
            onChange={handleChange}
          />
        </label>

        <label>
          Professional Experience
          <textarea
            name="professionalExperience"
            placeholder="Share your relevant work experience..."
            value={formData.professionalExperience}
            onChange={handleChange}
          ></textarea>
        </label>

        <label>
          Preferred Compensation
          <input
            type="text"
            name="preferredCompensation"
            placeholder="e.g., Equity range, salary expectations"
            value={formData.preferredCompensation}
            onChange={handleChange}
          />
        </label>

        <label>
          Portfolio URL
          <input
            type="url"
            name="portfolioURL"
            placeholder="https://your-portfolio.com"
            value={formData.portfolioURL}
            onChange={handleChange}
          />
        </label>

        <label>
          WhatsApp Number
          <input
            type="tel"
            name="whatsappNumber"
            placeholder="+1234567890"
            value={formData.whatsappNumber}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
};

export default Profile;
