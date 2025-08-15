import "./Botao.css";

const Botao = (props) => {
  return (
    <div className="divBotao">
      <button
        onClick={props.onClick}
        className={`botao ${props.boxShadow ? "com-sombra" : ""}`}
        style={{
          backgroundColor: props.corPrimaria,
          color: props.corSecundaria,
        }}
      >
        {props.children}
      </button>
    </div>
  );
};

export default Botao;
