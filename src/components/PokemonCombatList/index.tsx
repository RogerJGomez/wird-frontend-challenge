import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { Link } from "react-router-dom";
import { removePokemon } from "../../store/slices/pokemonCombatListSlice";
import {
  Pokemon,
  toggleSelectPokemon,
} from "../../store/slices/pokemonListSlice";
import { FaTrash } from "react-icons/fa6";

const PokemonCombatList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { pokemonCombatList } = useSelector(
    (state: RootState) => state.combatList
  );

  const removePokemonFromCombat = (pokemon: Pokemon) => {
    dispatch(removePokemon(pokemon));
    dispatch(toggleSelectPokemon({ pokemon, selected: false }));
  };

  return (
    <div className="w-full">
      <h1 className="font-semibold text-2xl text-center mt-4">
        LISTOS PARA EL COMBATE
      </h1>
      <div
        className={`flex flex-wrap w-full px-4 ${
          pokemonCombatList.length === 0 && "justify-center"
        }`}
      >
        {pokemonCombatList.length === 0 ? (
          <h1 className="text-xl mt-20">
            Lista vacía, no hay ningún pokémon listo
          </h1>
        ) : (
          pokemonCombatList.map((pokemon) => (
            <div
              className="xl:w-4/12 md:w-1/2 p-2 my-3 relative"
              key={pokemon.id}
            >
              <div className="flex flex-col justify-center items-center border-gray border rounded-md py-2">
                <Link to={`/pokemon/${pokemon.id}`}>
                  <img
                    src={pokemon.image}
                    alt={pokemon.name}
                    className="w-30 h-30"
                  />
                </Link>
                <p className="font-semibold capitalize">{pokemon.name}</p>
                <div
                  onClick={() => removePokemonFromCombat(pokemon)}
                  className="absolute top-5 right-5 flex items-center justify-center w-5 h-5 p-1 bg-gray-400 text-white text-xl rounded-full cursor-pointer hover:bg-gray-600"
                >
                  <FaTrash />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PokemonCombatList;
