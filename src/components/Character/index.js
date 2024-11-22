import "./Character.css";

const Character = ({ nome, imagem }) => {
  return (
    <div className="character">
      <h2>{nome}</h2>
      <div className="img-container">
        <img src={imagem} alt={nome} />
      </div>
    </div>
  );
};

export default Character;
