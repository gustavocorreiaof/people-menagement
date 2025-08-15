import "../CampoTexto.css";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Icon from "feather-icons-react";

const Senha = ({ valor, aoAlterado, iconSize }) => {
  const [visivel, setVisivel] = useState(false);

  const alternarVisibilidade = () => {
    setVisivel(!visivel);
  };

  return (
    <div className="campo-texto">
      <label>Senha</label>
      <div className="campo-texto__container">
        <span className="campo-texto_icone_esquerda">
          <Icon className="icon" icon="lock" />
        </span>

        <input
          className="input-senha"
          type={visivel ? "text" : "password"}
          value={valor}
          onChange={(e) => aoAlterado(e.target.value)}
          required={true}
          placeholder="Digite sua Senha"
        />
        <span className="campo-texto__icone" onClick={alternarVisibilidade}>
          {visivel ? (
            <Icon className="icon" icon="eye-off" />
          ) : (
            <Icon className="icon" icon="eye" />
          )}
        </span>
      </div>
    </div>
  );
};

export default Senha;
