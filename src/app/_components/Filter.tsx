import { useState } from "react";
import styled from "styled-components";
import { filterOptions } from "@/lib/utils";
import { Sport } from "@/lib/api/types";

const FilterButton = styled.button`
  background-color: #3D3D3D;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 4px 16px;
  cursor: pointer;
  font-size: 16px;
  width: 100px;
  position: absolute;
  right: 0;
  bottom: 16px;
  
  &:hover {
    background-color: #4A4A4A;
  }
`;

const Menu = styled.div`
  position: absolute;
  top: 54px;
  right: 0;
  background-color: #FFFFFF;
  border: 1px solid #444;
  border-radius: 6px;
  min-width: 320px;
  z-index: 10;
  box-shadow: 0 4px 8px rgba(0,0,0,0.3);

  div {
    border-bottom: 1px solid #E0E0E0;
  }
  div:last-child {
    border-bottom: none;
  }
`;

const MenuItem = styled.div<{ $active: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #3D3D3D;
  background-color: ${props => (props.$active ? '#D0D0D0' : 'transparent')};
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
  font-size: 16px;
  border-bottom: 1px solid #E0E0E0;
  padding: 8px 16px;
  &:hover {
    background-color: #D0D0D0;
    // background-color: ${props => (props.$active ? '#43a047' : '#444')};
  }
`;

const Counter = styled.div`
  font-size: 14px;
  padding: 4px 24px;
  color: #FFFFFF;
  background-color: #3D3D3D;
}`

interface FilterProps {
  sportsData: Sport[];
  handleChangeFilter: (values: string[]) => void;
}

const Filter: React.FC<FilterProps> = ({ sportsData, handleChangeFilter }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  const handleSelect = (value: string) => {
    if (value === 'all') {
      const updated = selected.includes('all') ? [] : filterOptions.map(opt => opt.value);
      setSelected(updated);
      handleChangeFilter?.(updated);
      return;
    }

    const isSelected = selected.includes(value);
    const filtered = selected.filter(v => v !== 'all');

    const updated = isSelected
      ? filtered.filter(v => v !== value)
      : [...filtered, value];

    const valuesWithoutAll = filterOptions.filter(opt => opt.value !== 'all').map(opt => opt.value);
    const hasAll = valuesWithoutAll.every(v => updated.includes(v));

    if (hasAll) updated.push('all');

    setSelected(updated);
    handleChangeFilter?.(updated);
  };

  const renderCounter = (type: string) => {
    if (type === 'all') {
      return sportsData.length;
    };

    const count = sportsData.filter(sport => sport.status.type === type).length;
    return count;
  };

  return (
    <div>
      <FilterButton
        onClick={() =>
        setIsFilterOpen((prev) => !prev)}
      >
        Filter
      </FilterButton>
      {isFilterOpen && (
        <Menu>
          {filterOptions.map(filterOption => (
            <MenuItem
              key={filterOption.value}
              $active={selected.includes(filterOption.value)}
              onClick={() => handleSelect(filterOption.value)}
            >
              {filterOption.label}
              <Counter>{renderCounter(filterOption.value)}</Counter>
            </MenuItem>
          ))}
        </Menu>
      )}
    </div>
  )
};

Filter.displayName = "Filter";

export default Filter;