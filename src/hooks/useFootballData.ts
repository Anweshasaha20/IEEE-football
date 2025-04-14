import { useEffect, useState } from "react";
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

export const useFootballData = () => {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [selectedCompetition, setSelectedCompetition] = useState("PL");
  const [standings, setStandings] = useState<Standing[]>([]);
  const [loading, setLoading] = useState(false);

  const API_TOKEN = import.meta.env.VITE_API_TOKEN;

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
      setSelectedCompetition(competitionsData[0]?.id);
    } catch (error) {
      console.error("Error fetching competitions:", error);
    }
  };

  useEffect(() => {
    fetchCompetitions();
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

  return {
    competitions,
    selectedCompetition,
    setSelectedCompetition,
    standings,
    loading,
  };
};
