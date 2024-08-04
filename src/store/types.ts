import { Pokemon } from "./slices/pokemonListSlice";

export interface SelectPokemonPayload {
  pokemon: Pokemon;
  selected: boolean;
}
