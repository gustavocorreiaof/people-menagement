import { useEffect, React } from "react";
import "./PeopleGrid.css";
import Alert from "../Alert/Index";
import { useState } from "react";

const PeopleGrid = ({ people, onEdit, onDelete }) => {
  const [erroKey, setErroKey] = useState(0);

  useEffect(() => {
    if (!people || people.length === 0) {
      setErroKey((prev) => prev + 1);
    }
  }, [people]);

  const formatCPF = (cpf) => {
    if (!cpf) return "";
    let valor = cpf.replace(/\D/g, "").substring(0, 11);
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    return valor;
  };

  const formatGender = (gender) => {
    switch (gender) {
      case 1:
        return "Feminino";
      case 2:
        return "Masculino";
      default:
        return "Outro";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return dateString.split("T")[0];
  };

  return (
    <div className="people-grid-container">
      <table className="people-grid">
        <thead>
          <tr>
            <th>Nome</th>
            <th>CPF</th>
            <th>Data de Nascimento</th>
            <th>Email</th>
            <th>Gênero</th>
            <th>Naturalidade</th>
            <th>Nacionalidade</th>
            <th>Endereço</th>
            <th>Editar</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          {people.length > 0 ? (
            people.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{formatCPF(p.cpf)}</td>
                <td>{formatDate(p.dateOfBirth)}</td>
                <td>{p.email}</td>
                <td>{formatGender(p.gender)}</td>
                <td>{p.naturality}</td>
                <td>{p.nationality}</td>
                <td>{p.address}</td>
                <td>
                  <button className="btn btn-edit" onClick={() => onEdit(p)}>
                    Editar
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-delete"
                    onClick={() => onDelete(p)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" style={{ textAlign: "center", padding: "20px" }}>
                <Alert
                  message={"Nenhuma pessoa encontrada."}
                  show={true}
                  animationKey={erroKey}
                />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PeopleGrid;
