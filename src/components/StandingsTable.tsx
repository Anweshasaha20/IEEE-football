import React from "react";

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

interface StandingsTableProps {
  standings: Standing[];
  loading: boolean;
}

const StandingsTable: React.FC<StandingsTableProps> = ({
  standings,
  loading,
}) => {
  if (loading) {
    return <div className="text-center text-white text-xl">Loading...</div>;
  }

  return (
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
  );
};

export default StandingsTable;
