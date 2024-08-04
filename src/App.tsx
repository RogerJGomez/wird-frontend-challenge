import React from "react";
import { Routes, Route } from "react-router-dom";
import PokemonList from "./components/PokemonList";
import PokemonDetail from "./components/PokemonDetails";
import PokemonCombatList from "./components/PokemonCombatList";

const App: React.FC = () => {
  return (
    <div className="w-full flex space-between my-10 px-4">
      <Routes>
        <Route path="/" element={<PokemonList />} />
        <Route path="/pokemon/:id" element={<PokemonDetail />} />
      </Routes>
      <div className="w-4/12 border-gray border rounded-md p-2">
        <div className="sticky top-10">
          <PokemonCombatList />
        </div>
      </div>
    </div>
  );
};

export default App;
