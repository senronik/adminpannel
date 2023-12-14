import React, { useState,useEffect } from 'react';
import '../css/tournament.css';

const Tournaments = () => {
  const [formData, setFormData] = useState({
    tournamentName: '',
    timeline: '',
    date: '',
    numberOfGames: '0',
    gameType: '',
    playerType: '',
    costPerGame: 0,
  });


  const [submittedData, setSubmittedData] = useState(
    JSON.parse(localStorage.getItem('submittedData')) || {}
  );
  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false); // State to manage alert visibility
  
  
  useEffect(() => {
    // Save submittedData to localStorage whenever it changes
    localStorage.setItem('submittedData', JSON.stringify(submittedData));
  }, [submittedData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation (you can add more complex validation logic as needed)
    const validationErrors = {};
    if (!formData.tournamentName.trim()) {
      validationErrors.tournamentName = 'Tournament Name is required';
    }
    if (!formData.timeline.trim()) {
      validationErrors.timeline = 'Timeline is required(formate HH:mm)';
    }
    if (!formData.date.trim()) {
      validationErrors.date = 'Date is required';
    }
    if (formData.numberOfGames === '0') {
      validationErrors.numberOfGames = 'Select Number of Games';
    }
    if (!formData.gameType.trim()) {
      validationErrors.gameType = 'Select Game Type';
    }
    if (!formData.playerType.trim()) {
      validationErrors.playerType = 'Player Types is required';
    }
    if (formData.costPerGame <= 0) {
      validationErrors.costPerGame = 'Cost per Game must be greater than 0';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Clear errors
    setErrors({});

    // Send data to backend
    try {
      //192.168.1.47
      const response = await fetch('http://localhost:5000/api/admin/tournament', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Handle response here
      console.log('Form submitted successfully:', formData);
      setSubmittedData(formData);
      setShowAlert(true);
      setFormData((prevFormData) => ({
        ...prevFormData,
        tournamentName: '',
        timeline: '',
        date: '',
        numberOfGames: '0',
        gameType: '',
        playerType: '',
        costPerGame: 0,
      }));
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  return (
    <div>
      <h1 style={{textAlign:'center',alignItems:'center',color:'black',fontWeight:'bold'}}>Tournaments Page</h1>
      <form className="form-style" onSubmit={handleSubmit}>
        {/* Other input fields */}
        <input
          type="text"
          name="tournamentName"
          placeholder="Tournament Name"
          className="input-style"
          onChange={handleChange}
        />
        {/* Display validation error */}
        {errors.tournamentName && <div className="error-message"  style={{ color: 'red' }}>{errors.tournamentName}</div>}

        {/* Other input fields */}
        <input
          type="text"
          name="timeline"
          placeholder="HH:mm"  // Set the placeholder text
          className="input-style"
          onChange={handleChange}
        />
        {/* Display validation error */}
        {errors.timeline && <div className="error-message"  style={{ color: 'red' }}>{errors.timeline}</div>}

        {/* Other input fields */}
        <input
          type="Date"
          name="date"
          placeholder="Date of tournaments"
          className="input-style"
          
          onChange={handleChange}
        />
        {/* Display validation error */}
        {errors.date && <div className="error-message"  style={{ color: 'red' }}>{errors.date}</div>}

        {/* Select for Number of Games */}
        <select
          name="numberOfGames"
          className="input-style"
          onChange={handleChange}
          value={formData.numberOfGames}
        >
          <option value="0">Select Number of Games</option>
          <option value="64">64</option>
          <option value="16">16</option>
          <option value="4">4</option>
          <option value="1">1</option>
        </select>
        {/* Display validation error */}
        {errors.numberOfGames && <div className="error-message"  style={{ color: 'red' }}>{errors.numberOfGames}</div>}

        {/* Select for Game Type */}
        <select
          name="gameType"
          className="input-style"
          onChange={handleChange}
          value={formData.gameType}
        >
          <option value="">Select Game Type</option>
          <option value="Time Attack">Time Attack</option>
          <option value="Dice Turn">Dice Turn</option>
        </select>
        {/* Display validation error */}
        {errors.gameType && <div className="error-message"  style={{ color: 'red' }}>{errors.gameType}</div>}

        {/* Other input fields */}
        <select
          name="playerType"
          className="input-style"
          onChange={handleChange}
          value={formData.playerType}
        >
          <option value="">Select Player Type</option>
          <option value="1 v 1">1 v 1</option>
          <option value="1 v 4">1 v 4</option>
        </select>
        {/* Display validation error */}
        {errors.playerTypes && <div className="error-message"  style={{ color: 'red' }}>{errors.playerTypes}</div>}

        {/* Other input fields */}
        <input
          type="number"
          name="costPerGame"
          placeholder="Cost of Entry per Game"
          className="input-style"
          onChange={handleChange}
        />
        {/* Display validation error */}
        {errors.costPerGame && <div className="error-message"  style={{ color: 'red' }}>{errors.costPerGame}</div>}

        <button type="submit" className="button-style">
          Create Tournament
        </button>
      </form>

      {/* Display submitted data */}
      {submittedData && (
        <table className="data-table">
          <thead>
            <tr>
              <th>Tournament Name</th>
              <th>Timeline</th>
              <th>Date</th>
              <th>Number of Games</th>
              <th>Game Type</th>
              <th>Player Types</th>
              <th>Cost per Game</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{submittedData.tournamentName}</td>
              <td>{submittedData.timeline}</td>
              <td>{submittedData.date}</td>
              <td>{submittedData.numberOfGames}</td>
              <td>{submittedData.gameType}</td>
              <td>{submittedData.playerType}</td>
              <td>{submittedData.costPerGame}</td>
            </tr>
          </tbody>
        </table>
      )}
      
      {/* Success Alert */}
      {showAlert && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-green-500 p-8 rounded-md text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="mx-auto h-12 w-12 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <p className="text-white text-lg font-semibold mt-2">
              Tournament Successfully Added
            </p>
            <button
              onClick={() => setShowAlert(false)}
              className="bg-white text-green-500 px-4 py-2 mt-4 rounded-md"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tournaments;
