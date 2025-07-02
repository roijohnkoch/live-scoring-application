import styled from "styled-components";
import Filter from "./Filter";
import { Sport } from "@/lib/api/types";

const Container = styled.div`
  font-size: 2rem;
  font-weight: bold;
  padding: 8px 0;
  position: sticky;
  top: 0;
  background-color: #FFFFFF;
  z-index: 1;
  display: flex;
  justify-content: center;
  width: 100%;
  border-bottom: 1px solid #E0E0E0;
`;

interface HeaderProps {
  sportsData: Sport[];
  handleChangeFilter: (values: string[]) => void;
}

const Header: React.FC<HeaderProps> = ({ sportsData, handleChangeFilter }) => {
  return (
    <Container>
      Live Scoring 
      <Filter
        sportsData={sportsData}
        handleChangeFilter={handleChangeFilter}
      />
    </Container>
  )
};

Header.displayName = "Header";

export default Header;