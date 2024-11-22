import { useEffect, useState } from "react";
import { buscarDados } from "./api";
import Character from "./components/Character/index.js";

function App() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCharacters() {
      const results = await buscarDados();
      const resultsFiltered = results.filter(
        (character) => !character.thumbnail.path.includes("image_not_available")
      );
      setCharacters(resultsFiltered);
      setLoading(false);
    }

    fetchCharacters();
  }, []);

  function avancarPagina() {
    setLoading(true);
    buscarDados().then((newCharacters) => {
      const filteredResults = newCharacters.filter(
        (character) => !character.thumbnail.path.includes("image_not_available")
      );
      setCharacters(filteredResults);
      setLoading(false);
    });
  }

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="App">
      <h1>Personagens Marvel</h1>
      <section className="characters-container">
        {characters.map((character) => (
          <Character
            nome={character.name}
            imagem={`${character.thumbnail.path}.${character.thumbnail.extension}`}
            key={character.id}
          />
        ))}
      </section>
      <button onClick={avancarPagina}>Next</button>
    </div>
  );
}

export default App;
