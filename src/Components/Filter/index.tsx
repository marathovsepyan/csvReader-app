import React, { ChangeEvent, FC } from "react";
import styled from "styled-components";
import { TypesOfSpec } from "../../Utils/mainInterfaces";
import { useDispatch, useSelector } from "react-redux";
import { selectedFilter, setSelectedSpecies } from "../../Reducers";

const FilterContainer = styled.div`
  text-align: right;
  margin: 1rem;
  margin-right: 20px;
  display: flex;
`;

const Select = styled.select`
  outline: none;
  border: 2px solid gray;
  border-radius: 5px;
  background: white;
  width: 150px;
  height: 38px;
  text-align: center;
`;

export const Filter: FC = () => {
  const val = useSelector(selectedFilter);
  const dispatch = useDispatch();

  return (
    <FilterContainer>
      <Select
        value={val}
        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
          dispatch(setSelectedSpecies(e.target.value))
        }
      >
        <option value="" className={val === "" ? "selected" : ""}>
          All
        </option>
        {Object.values(TypesOfSpec).map((t) => (
          <option value={t} key={t} className={val === t ? "selected" : ""}>
            {t}
          </option>
        ))}
      </Select>
    </FilterContainer>
  );
};
