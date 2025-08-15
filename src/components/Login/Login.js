import { useState, useEffect } from "react";
import Botao from "../Botao";
import CPF from "../CamposDeTexto/CPF/Index";
import "./Login.css";
import Senha from "../CamposDeTexto/Senha/Index";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Alert from "../Alert/Index";
import Particles from "../External/Particles";

const Login = () => {
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [hasErro, setHasErro] = useState(false);
  const [erroKey, setErroKey] = useState(0);
  const navigate = useNavigate();

  const efetuarLogin = async (evento) => {
    try {
      evento.preventDefault();

      const cpfSemCaracteres = cpf.replace(/[^0-9]/g, "");

      const response = await axios.post(
        "https://localhost:7102/api/Authenticacoes/login",
        {
          cpf: cpfSemCaracteres,
          senha: senha,
        }
      );

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);

        console.log(response.data);

        if (response.data.isAdmin) navigate("/paginaAdmin");
        else navigate("/paginaInicial");
      }
    } catch (error) {
      if (error.response) {
        setErroMessage(error.response.data.erros);
      } else {
        setErroMessage("Erro de rede: " + error.message);
      }
    }
  };

  const setErroMessage = (errorMessage) => {
    setErro(errorMessage);
    setHasErro(true);
    setErroKey((prev) => prev + 1);
  };

  const formatarCPF = (valor) => {
    valor = valor.replace(/\D/g, "");

    valor = valor.substring(0, 11);

    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    return valor;
  };

  const aoAlterarCPF = (valor) => {
    const cpfFormatado = formatarCPF(valor);
    setCpf(cpfFormatado);
  };

  return (
    <div style={{ width: "100vw", height: "99vh", position: "relative" }}>
      <Particles
        particleColors={["#ffffff", "#ffffff"]}
        particleCount={400}
        particleSpread={10}
        speed={0.2}
        particleBaseSize={200}
        moveParticlesOnHover={true}
        alphaParticles={false}
        disableRotation={true}
      />

      <section className="formulario">
        <form onSubmit={efetuarLogin}>
          <img
            className="stefaniniLogo"
            src={"https://i.imgur.com/tj1xzXn.png"}
          ></img>

          <h1>Encontros Universitários 2025</h1>
          <h4>Acesse sua conta para continuar</h4>

          <div className="inputs-login">
            <CPF
              obrigatorio={true}
              label="CPF"
              placeholder="Digite seu CPF"
              valor={cpf}
              aoAlterado={aoAlterarCPF}
              iconSize={"2rem"}
            />

            <Senha
              valor={senha}
              aoAlterado={(valor) => setSenha(valor)}
              iconSize={"2rem"}
            />
          </div>

          <div className="btnAndAlert">
            <Alert message={erro} show={hasErro} animationKey={erroKey} />

            <Botao corPrimaria={"var(--second-color)"} corSecundaria={"#FFF"}>
              Entrar
            </Botao>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Login;
