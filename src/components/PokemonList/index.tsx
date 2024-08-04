import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import {
  fetchPokemon,
  Pokemon,
  toggleSelectPokemon,
} from "../../store/slices/pokemonListSlice";
import { Link } from "react-router-dom";
import { addPokemon } from "../../store/slices/pokemonCombatListSlice";
import { FaPlus } from "react-icons/fa";

const PokemonList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchTerm, setSearchTerm] = useState("");
  const { list, loading } = useSelector(
    (state: RootState) => state.pokemonlist
  );
  const { pokemonCombatList } = useSelector(
    (state: RootState) => state.combatList
  );

  useEffect(() => {
    if (list.length === 0) {
      dispatch(fetchPokemon());
    }
  }, [dispatch, list]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredPokemon = useMemo(
    () =>
      searchTerm.length >= 3
        ? list.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : list,
    [searchTerm, list]
  );

  const addPokemonToCombat = (pokemon: Pokemon) => {
    dispatch(addPokemon(pokemon));
    dispatch(toggleSelectPokemon({ pokemon, selected: true }));
  };

  return (
    <div className="w-8/12">
      <div className="w-full flex justify-center">
        <input
          type="text"
          placeholder="Que pokemon buscas..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full max-w-md focus:outline-none p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex flex-wrap w-full justify-center">
        {loading ? (
          <h1 className="text-2xl mt-10">Loading...</h1>
        ) : (
          filteredPokemon.map((pokemon) => (
            <div className="w-3/12 p-2 my-3 relative" key={pokemon.id}>
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
                  onClick={() =>
                    !pokemon.selected && pokemonCombatList.length < 6
                      ? addPokemonToCombat(pokemon)
                      : null
                  }
                  className={`absolute top-5 right-5 flex items-center justify-center p-1 w-5 h-5 bg-gray-400 text-white text-xl rounded-full ${
                    !pokemon.selected && pokemonCombatList.length < 6
                      ? "cursor-pointer"
                      : ""
                  } hover:bg-gray-600`}
                >
                  <FaPlus />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PokemonList;
