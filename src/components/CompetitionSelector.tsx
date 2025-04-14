import React from "react";

interface Competition {
  id: string;
  name: string;
}

interface CompetitionSelectorProps {
  competitions: Competition[];
  selectedCompetition: string;
  setSelectedCompetition: (competitionId: string) => void;
}

const CompetitionSelector: React.FC<CompetitionSelectorProps> = ({
  competitions,
  selectedCompetition,
  setSelectedCompetition,
}) => {
  return (
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
  );
};

export default CompetitionSelector;
