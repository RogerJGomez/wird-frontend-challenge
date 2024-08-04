import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Pokemon } from "./pokemonListSlice";

export interface PokemonState {
  pokemonCombatList: Pokemon[];
}

const initialState: PokemonState = {
  pokemonCombatList: [],
};

export const pokemonCombatListSlice = createSlice({
  name: "pokemonCombatList",
  initialState,
  reducers: {
    addPokemon: (state, action: PayloadAction<Pokemon>) => {
      state.pokemonCombatList = [...state.pokemonCombatList, action.payload];
    },
    removePokemon: (state, action: PayloadAction<Pokemon>) => {
      state.pokemonCombatList = state.pokemonCombatList.filter(
        (pokemon) => pokemon.name !== action.payload.name
      );
    },
  },
});

export const { addPokemon, removePokemon } = pokemonCombatListSlice.actions;

export default pokemonCombatListSlice.reducer;
