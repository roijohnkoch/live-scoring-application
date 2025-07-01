"use client"
import { useEffect, useState } from "react";
import { Container, Main } from "./_components/shared";
import LiveScoring from "./_components/LiveScoring";
import { Sport } from "@/lib/api/types";

const Page = () => {
  const [sportsData, setSportsData] = useState<Sport[]>([]);

  const getSportsData = async () => {
    const response = await fetch('/api/sports');
    const responseData = await response.json();
    setSportsData(responseData);
  };

  useEffect(() => {
    getSportsData();
  }, []);

  return (
    <Container>
      <Main>
        <div>Live Scoring Application</div>
        <LiveScoring sports={sportsData} />
      </Main>
    </Container>
  )
};

export default Page;