import React, { useEffect, useState } from "react";
import axios from "axios";

interface Standing {
  position: number;
  team: {
    name: string;
    crest: string;
  };
  playedGames: number;
  won: number;
  draw: number;
  lost: number;
  points: number;
}
interface Competition {
  id: string;
  name: string;
}

// const competitions = [
//   { id: "PL", name: "Premier League" },
//   { id: "PD", name: "La Liga" },
//   { id: "SA", name: "Serie A" },
//   { id: "BL1", name: "Bundesliga" },
//   { id: "FL1", name: "Ligue 1" },
// ];

const App: React.FC = () => {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [selectedCompetition, setSelectedCompetition] = useState("PL");
  const [standings, setStandings] = useState<Standing[]>([]);
  const [loading, setLoading] = useState(false);

  const API_TOKEN = "720f8458977245abb5517afe8470306d"; // Replace with your API key from football-data.org

  // Fetch all available competitions from the API
  const fetchCompetitions = async () => {
    try {
      const response = await axios.get(`/api/competitions`, {
        headers: {
          "X-Auth-Token": API_TOKEN,
        },
      });
      const competitionsData = response.data.competitions.map((comp: any) => ({
        id: comp.code,
        name: comp.name,
      }));
      setCompetitions(competitionsData);
      setSelectedCompetition(competitionsData[0]?.id); // Default to the first competition if available
    } catch (error) {
      console.error("Error fetching competitions:", error);
    }
  };
  useEffect(() => {
    fetchCompetitions(); // Fetch competitions when the component mounts
  }, []);

  const fetchStandings = async (competitionId: string) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `/api/competitions/${competitionId}/standings`,
        {
          headers: {
            "X-Auth-Token": API_TOKEN,
          },
        }
      );
      console.log(response.data);
      const data = response.data.standings[0].table;
      setStandings(data);
    } catch (error) {
      console.error("Error fetching standings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStandings(selectedCompetition);
  }, [selectedCompetition]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-white drop-shadow-lg">
        Football League Standings
      </h1>

      <div className="flex justify-center mb-8">
        <select
          value={selectedCompetition}
          onChange={(e) => setSelectedCompetition(e.target.value)}
          className="w-64 md:w-96 p-3 rounded-lg border-2 border-purple-300 bg-white shadow-lg text-lg font-semibold hover:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400 text-center"
        >
          {competitions.map((comp) => (
            <option key={comp.id} value={comp.id}>
              {comp.name}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="text-center text-white text-xl">Loading...</div>
      ) : (
        <div className="overflow-x-auto rounded-xl shadow-2xl">
          <table className="table-auto w-full bg-white/90 backdrop-blur-sm">
            <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <tr>
                <th className="p-4">Pos</th>
                <th className="p-4">Team</th>
                <th className="p-4">Played</th>
                <th className="p-4">Won</th>
                <th className="p-4">Drawn</th>
                <th className="p-4">Lost</th>
                <th className="p-4">Pts</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((team) => (
                <tr
                  key={team.team.name}
                  className="text-center border-b border-gray-200 hover:bg-purple-50 transition-colors duration-150"
                >
                  <td className="p-4 font-semibold">{team.position}</td>
                  <td className="p-4 flex items-center gap-3 justify-center">
                    <img
                      src={team.team.crest}
                      alt={team.team.name}
                      className="w-8 h-8 object-contain"
                    />
                    <span className="font-medium">{team.team.name}</span>
                  </td>
                  <td className="p-4">{team.playedGames}</td>
                  <td className="p-4 text-green-600 font-medium">{team.won}</td>
                  <td className="p-4 text-gray-600 font-medium">{team.draw}</td>
                  <td className="p-4 text-red-600 font-medium">{team.lost}</td>
                  <td className="p-4 font-bold text-lg">{team.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default App;
