"use client"
import { useEffect, useState } from "react";
import { Container, Main } from "./_components/shared";
import LiveScoring from "./_components/LiveScoring";
import { Sport } from "@/lib/api/types";
import Header from "./_components/Header";

const Page = () => {
  const [sportsData, setSportsData] = useState<Sport[]>([]);
  const [filteredSportsData, setFilteredSportsData] = useState<Sport[]>([]);
  
  const getSportsData = async () => {
    const response = await fetch('/api/sports');
    const responseData = await response.json();
    setSportsData(responseData);
    setFilteredSportsData(responseData);
  };

  const handleChangeFilter = (selectedValues: string[]) => {
      if (selectedValues.includes('all') || selectedValues.length === 0) {
      setFilteredSportsData(sportsData);
      return;
    }

    const filtered = sportsData.filter(sportData =>
      selectedValues.includes(sportData.status.type)
    );

    setFilteredSportsData(filtered);
  };

  useEffect(() => {
    getSportsData();
  }, []);

  return (
    <Container>
      <Main>
        <Header sportsData={sportsData} handleChangeFilter={handleChangeFilter} />
        <LiveScoring sports={filteredSportsData} />
      </Main>
    </Container>
  )
};

export default Page;