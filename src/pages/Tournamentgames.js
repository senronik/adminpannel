import React from 'react';
import '../css/tournament.css';
import { useState ,useEffect} from 'react';

const TournamentGames = () => {
  const [tournaments,setTournaments]=useState([]);
  const [selectedTournament, setSelectedTournament] = useState(null);

  const fetchNumberOfGames = async () => {
    try {
      // Fetch data from the API endpoint
      //192.168.1.47
      const response = await fetch('http://localhost:5000/api/admin/tournamentdetail');
  
      // Check if the response is successful
      if (!response.ok) throw new Error('Network response was not ok');
  
      // Parse the response data as JSON
      const data = await response.json();
      console.log(data.tournaments)
      setTournaments(data.tournaments);
    } catch (error) {
      console.error('Error fetching number of games:', error);
      // Handle errors as needed
    }
  };
    const generateGamesForTournament = (tournament) => {
    return Array.from({ length: tournament.numberOfGames }, (_, index) => ({
      gameId: `game-${index + 1}`,
      gameName :`${tournament.tournamentName}_game_${index+1}`,
      winnerId: '',
      winnerName: ''
    }));
  };

  
  const storeGamesForTournament = async (tournamentId, games) => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/games', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          // Add other headers if needed
        },
        body: JSON.stringify({
          tournamentId,
          games
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log(responseData);

      // If you want to refresh the tournament data after storing games, you can uncomment the line below
      // fetchNumberOfGames();
    } catch (error) {
      console.error('Error storing games:', error.message);
    }
  };

  

  useEffect(() => {
    fetchNumberOfGames();
  }, []);

  const handleTournamentClick = (tournament) => {
    // Toggle visibility of the corresponding table
    setSelectedTournament((prevSelectedTournament) =>
      prevSelectedTournament && prevSelectedTournament._id === tournament._id
        ? null
        : tournament
    );
  };
  return (
    <div className="container mx-auto p-4">
      {tournaments.map((tournament, index) => (
        <div key={index} className="mb-8">
          <div className="bg-blue-500 text-white p-4 cursor-pointer"
            onClick={() => handleTournamentClick(tournament)}
          >
            <h2 className="text-2xl font-bold">{tournament.tournamentName}</h2>
            <p>Timeline: {tournament.timeline}</p>
            <p>Date: {tournament.date}</p>
            <p>Number of Games: {tournament.numberOfGames}</p>
            <p>Game Type: {tournament.gameType}</p>
            <p>Player Type: {tournament.playerType}</p>
            <p>Cost per Game: ${tournament.costPerGame}</p>
            <p>tournamentID: {tournament._id}</p>
          </div>

          {selectedTournament && selectedTournament._id === tournament._id && (
          <div className="mt-4">
            <h3 className="text-xl font-bold mb-2">{tournament.tournamentName} Games</h3>
            
    {/* Button to trigger storing games */}
    <button
      className="bg-green-500 text-white px-4 py-2 rounded"
      onClick={() =>
        storeGamesForTournament(tournament._id, generateGamesForTournament(tournament))
      }
    >
      Store Games
    </button>
            <table className="w-full border-collapse border border-gray-400">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-400 p-2">Game Name</th>
                  <th className="border border-gray-400 p-2">Game ID</th>
                  <th className="border border-gray-400 p-2">Winner </th>
                  <th className="border border-gray-400 p-2">Winner Name</th>
                </tr>
              </thead>
              <tbody>
                {generateGamesForTournament(tournament).map((game) => (
                  <tr key={game.id} className="border border-gray-400">
                    <td className="border border-gray-400 p-2">{game.id}</td>
                    <td className="border border-gray-400 p-2">{game.gameName}</td>
                    <td className="border border-gray-400 p-2">{game.winner}</td>
                    <td className="border border-gray-400 p-2">{game.winnerId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TournamentGames;