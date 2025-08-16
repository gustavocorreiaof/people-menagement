import { useState } from "react";
import "./PersonFilter.css";

const PersonFilter = ({ onResults }) => {
  const [filters, setFilters] = useState({
    name: "",
    cpf: "",
    dateOfBirth: "",
    email: "",
    gender: "",
    naturality: "",
    nationality: "",
    address: "",
  });

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
    setFilters((prev) => ({
      ...prev,
      cpf: cpfFormatado,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const buildQueryString = (params) => {
    const query = Object.entries(params)
      .filter(([_, v]) => v !== "" && v !== null && v !== undefined) // só adiciona se tiver valor
      .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
      .join("&");
    return query ? `?${query}` : "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const queryString = buildQueryString(filters);

      let token = localStorage.getItem("token");

      const response = await fetch(
        `https://localhost:7174/api/v1.0/People/${queryString}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Erro ao buscar pessoas");
      }
      const data = await response.json();

      // retorna os resultados pro pai (ou pode armazenar aqui mesmo)
      onResults(data);
    } catch (error) {
      console.error("Erro ao buscar pessoas:", error);
    }
  };

  const handleClear = () => {
    const cleared = {
      name: "",
      cpf: "",
      dateOfBirth: "",
      email: "",
      gender: "",
      naturality: "",
      nationality: "",
      address: "",
    };
    setFilters(cleared);
    onResults([]); // limpa resultados no pai
  };

  return (
    <form onSubmit={handleSubmit} className="filter-form">
      <input
        type="text"
        name="name"
        value={filters.name}
        onChange={handleChange}
        placeholder="Nome"
      />

      <input
        type="text"
        name="cpf"
        value={filters.cpf}
        onChange={(e) => aoAlterarCPF(e.target.value)}
        placeholder="CPF"
      />

      <input
        type="date"
        name="dateOfBirth"
        value={filters.dateOfBirth}
        onChange={handleChange}
      />

      <input
        type="email"
        name="email"
        value={filters.email}
        onChange={handleChange}
        placeholder="Email"
      />

      <select name="gender" value={filters.gender} onChange={handleChange}>
        <option value="">Gênero</option>
        <option value="2">Masculino</option>
        <option value="1">Feminino</option>
        <option value="0">Outro</option>
      </select>

      <input
        type="text"
        name="naturality"
        value={filters.naturality}
        onChange={handleChange}
        placeholder="Naturalidade"
      />

      <input
        type="text"
        name="nationality"
        value={filters.nationality}
        onChange={handleChange}
        placeholder="Nacionalidade"
      />

      <input
        type="text"
        name="address"
        value={filters.address}
        onChange={handleChange}
        placeholder="Endereço"
      />

      <button type="submit" className="btn btn-primary">
        Filtrar
      </button>
      <button type="button" onClick={handleClear} className="btn btn-secondary">
        Limpar
      </button>
    </form>
  );
};

export default PersonFilter;
