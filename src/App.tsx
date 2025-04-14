import React from "react";
import { useFootballData } from "./hooks/useFootballData";
import CompetitionSelector from "./components/CompetitionSelector";
import StandingsTable from "./components/StandingsTable";

const App: React.FC = () => {
  const {
    competitions,
    selectedCompetition,
    setSelectedCompetition,
    standings,
    loading,
  } = useFootballData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-white drop-shadow-lg">
        Football League Standings
      </h1>

      <CompetitionSelector
        competitions={competitions}
        selectedCompetition={selectedCompetition}
        setSelectedCompetition={setSelectedCompetition}
      />

      <StandingsTable standings={standings} loading={loading} />
    </div>
  );
};

export default App;
