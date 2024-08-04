import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { SelectPokemonPayload } from "../types";

export interface PokemonStat {
  base_stat: number;
  stat: {
    name: string;
  };
}

export interface PokemonType {
  type: {
    name: string;
  };
}

export interface Pokemon {
  name: string;
  id: number;
  image: string;
  height: number;
  types: PokemonType[];
  stats: PokemonStat[];
  selected: boolean;
}

export interface PokemonState {
  list: Pokemon[];
  loading: boolean;
  error: string | null;
}

const initialState: PokemonState = {
  list: [],
  loading: false,
  error: null,
};

export const fetchPokemon = createAsyncThunk<Pokemon[], void>(
  "pokemon/fetchPokemon",
  async () => {
    const response = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=151"
    );
    const results = response.data.results;

    const pokemonList = await Promise.all(
      results.map(
        async (pokemon: { name: string; url: string }, index: number) => {
          const id = index + 1;
          const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
          const pokemonDetails = await axios.get(pokemon.url);
          const { height, types, stats } = pokemonDetails.data;
          return {
            name: pokemon.name,
            id,
            image,
            height,
            types,
            stats,
            selected: false,
          };
        }
      )
    );

    return pokemonList;
  }
);

export const pokemonListSlice = createSlice({
  name: "pokemons",
  initialState,
  reducers: {
    toggleSelectPokemon: (
      state,
      action: PayloadAction<SelectPokemonPayload>
    ) => {
      state.list = state.list.map((pokemon) =>
        pokemon.id === action.payload.pokemon.id
          ? { ...pokemon, selected: action.payload.selected }
          : pokemon
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPokemon.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPokemon.fulfilled, (state, action) => {
      state.list = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchPokemon.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch Pokémon";
    });
  },
});

export const selectPokemon = (state: RootState) => state.pokemonlist.list;
export const { toggleSelectPokemon } = pokemonListSlice.actions;

export default pokemonListSlice.reducer;
