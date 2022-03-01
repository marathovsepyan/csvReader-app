import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "../Store";
import { MainTypes } from "../Utils/mainInterfaces";

interface ForestState {
  loading: boolean;
  stands: MainTypes[];
  selectedSpecies: string;
}

const initialState: ForestState = {
  loading: false,
  stands: [],
  selectedSpecies: "",
};

export const forestSlice = createSlice({
  name: "forest",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setStands: (state, action: PayloadAction<MainTypes[]>) => {
      state.stands = action.payload;
    },
    setSelectedSpecies: (state, action: PayloadAction<string>) => {
      state.selectedSpecies = action.payload;
    },
  },
});

export const { setLoading, setStands, setSelectedSpecies } =
  forestSlice.actions;

export const selectLoading = (state: RootState) => state.forest.loading;

export const selectStands = (state: RootState) => state.forest.stands;

const selectSpeciesParam = (_: any, species: string) => species;

export const selectFilter = createSelector(
  [selectStands, selectSpeciesParam],
  (stands: MainTypes[], species: string) =>
    species ? stands.filter((o) => o.main_species === species) : stands
);

export const selectedFilter = (state: RootState) =>
  state.forest.selectedSpecies;

export default forestSlice.reducer;
