import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../store/store";
import { FaArrowLeft } from "react-icons/fa";
import {
  Pokemon,
  toggleSelectPokemon,
} from "../../store/slices/pokemonListSlice";
import {
  addPokemon,
  removePokemon,
} from "../../store/slices/pokemonCombatListSlice";

const PokemonDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { list } = useSelector((state: RootState) => state.pokemonlist);
  const { pokemonCombatList } = useSelector(
    (state: RootState) => state.combatList
  );

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const pokemonDetails = useMemo(
    () => list.find((pokemon) => pokemon.id === Number(id)),
    [id, list]
  );

  const addPokemonToCombat = (pokemon: Pokemon) => {
    dispatch(addPokemon(pokemon));
    dispatch(toggleSelectPokemon({ pokemon, selected: true }));
  };

  const removePokemonFromCombat = (pokemon: Pokemon) => {
    dispatch(removePokemon(pokemon));
    dispatch(toggleSelectPokemon({ pokemon, selected: false }));
  };

  const handleAddOrRemovePokemon = (pokemon: Pokemon) => {
    if (!pokemon.selected && pokemonCombatList.length === 6) {
      return;
    }
    if (pokemon.selected) {
      removePokemonFromCombat(pokemon);
    } else {
      addPokemonToCombat(pokemon);
    }
  };

  if (!pokemonDetails) {
    return (
      <div className="w-8/12 flex justify-center items-center">
        <div className="cursor-pointer" onClick={() => () => navigate(-1)}>
          <FaArrowLeft className="mr-2" />
        </div>
        <h1>Pokemon no encontrado</h1>
      </div>
    );
  }

  return (
    <div className="w-8/12 flex justify-between items-start">
      <div
        className="cursor-pointer flex items-center mx-3"
        onClick={() => navigate("/")}
      >
        <FaArrowLeft className="mr-2" /> Volver
      </div>
      <div className="max-w-xl w-full p-4 border-gray border rounded-lg text-center">
        <img
          src={pokemonDetails.image}
          alt={pokemonDetails.name}
          className="mx-auto w-64 h-64 object-contain mb-4"
        />
        <div className="flex-grow flex flex-col md:flex-row">
          <div className="flex-1">
            <h1 className="capitalize text-2xl font-bold mb-4">
              {pokemonDetails.name}
            </h1>
            <p className="text-gray-700 mb-2">Numero: {pokemonDetails.id}</p>
            <p className="text-gray-700 mb-2">
              Altura: {pokemonDetails.height} cm
            </p>
            <p className="text-gray-700 mb-4">
              Tipo:{" "}
              {pokemonDetails.types.map((type) => type.type.name).join(", ")}
            </p>
          </div>
          <div className="flex-1 border-l border-gray-300">
            <h2 className="text-xl font-semibold mb-2">Estadisticas base:</h2>
            <ul className="text-gray-700">
              {pokemonDetails.stats.map((stat) => (
                <li key={stat.stat.name} className="capitalize">
                  {stat.stat.name}: {stat.base_stat}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div
        className="cursor-pointer flex items-center border border-gray rounded-md p-2 mx-3"
        onClick={() => handleAddOrRemovePokemon(pokemonDetails)}
      >
        {pokemonDetails.selected
          ? "Eliminar de la lista"
          : "Agregar a la lista"}
      </div>
    </div>
  );
};

export default PokemonDetail;
