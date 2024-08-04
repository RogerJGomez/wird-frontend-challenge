import { configureStore } from "@reduxjs/toolkit";
import pokemonCombatList from "./slices/pokemonCombatListSlice";
import pokemonList from "./slices/pokemonListSlice";

export const store = configureStore({
  reducer: {
    combatList: pokemonCombatList,
    pokemonlist: pokemonList,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
