import LayoutComCabecalho from "../components/LayoutComCabecalho/index";
import PersonFilter from "../components/PersonFilter/index";
import { useState } from "react";
import PeopleGrid from "../components/PeopleGrid/index";
import "./InitialPage.css";

const PaginaInicial = () => {
  const [peoples, setPeoples] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);

  const handleDeleteClick = (person) => {
    setSelectedPerson(person);
    setModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const token = localStorage.getItem("token"); // se houver auth
      const response = await fetch(
        `https://localhost:7174/api/v1.0/People/${selectedPerson.cpf}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      if (!response.ok) throw new Error("Erro ao deletar pessoa");

      setPeoples((prev) => prev.filter((p) => p.cpf !== selectedPerson.cpf));
    } catch (error) {
      console.error(error);
    } finally {
      setModalOpen(false);
      setSelectedPerson(null);
    }
  };

  const handleCancelDelete = () => {
    setModalOpen(false);
    setSelectedPerson(null);
  };

  return (
    <LayoutComCabecalho>
      <PersonFilter onResults={setPeoples} />
      <PeopleGrid
        people={peoples}
        onEdit={(p) => console.log("Editar:", p)}
        onDelete={handleDeleteClick}
      />

      {modalOpen && (
        <div className="modal-backdrop">
          <div className="modal">
            <p>
              Deseja realmente apagar a pessoa{" "}
              <strong>{selectedPerson.name}</strong>?
            </p>
            <button onClick={handleConfirmDelete}>Sim</button>
            <button onClick={handleCancelDelete}>Não</button>
          </div>
        </div>
      )}
    </LayoutComCabecalho>
  );
};

export default PaginaInicial;
