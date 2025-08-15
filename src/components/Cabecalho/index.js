import "./Cabecalho.css";
import Icon from "feather-icons-react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Cabecalho = ({ setOpenMenu }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const routes = [
    { page: "Palestras", path: "/paginaAdmin", value: 0 },
    { page: "Sobre", path: "/sobre", value: 1 },
    { page: "Configurações", path: "/configuracoes", value: 2 },
  ];

  useEffect(() => {
    const lastPage = localStorage.getItem("lastPage");

    if (lastPage) {
      const actualRoute = location.pathname;
      const actualRouteElement = routes.find(
        (route) => route.path === actualRoute
      );
      const lastRouteElement = routes.find((route) => route.path === lastPage);
      const elementToActivate = document.querySelector(
        `.navBar a[href="${actualRoute}"]`
      );

      if (actualRouteElement.value < lastRouteElement.value)
        elementToActivate.classList.add("activeRight");
      else elementToActivate.classList.add("activeLeft");
    }
  }, []);

  const handleNavLinkClick = (event, path) => {
    event.preventDefault();

    if (path === location.pathname) return;

    localStorage.setItem("lastPage", location.pathname);

    const itemToAnimate = document.querySelector(".active");

    if (itemToAnimate) {
      const actualRouteElement = routes.find(
        (route) => route.path === location.pathname
      );
      const toElement = routes.find((route) => route.path === path);
      const classToAdd =
        actualRouteElement.value < toElement.value
          ? "removingFromRight"
          : "removingFromLeft";

      itemToAnimate.classList.add(classToAdd);
      itemToAnimate.classList.add("removing");

      setTimeout(() => {
        itemToAnimate.classList.add(classToAdd);
        itemToAnimate.classList.remove("removing");

        navigate(path);
      }, 300);
    } else {
      navigate(path);
    }
  };

  return (
    <div className="cabecalho">
      <div className="right">
        <div className="logo">
          <img
            className="logo"
            src={"https://i.imgur.com/tj1xzXn.png"}
            alt="Logo"
          />
        </div>

        <div className="title">
          <span className="firstWord">Encontros </span>{" "}
          <span className="secondWord">Universitários</span>
        </div>
      </div>
      <div className="titleMinifyed">
        <span>SIs</span>
        <span style={{ color: "var(--second-color)" }}>EUs</span>
      </div>
      <div className="left">
        <nav className="navBar">
          <NavLink
            to="/paginaAdmin"
            className={({ isActive }) => (isActive ? "active" : "")}
            end
            onClick={(e) => handleNavLinkClick(e, "/paginaAdmin")}
          >
            Palestras
          </NavLink>
          <NavLink
            to="/sobre"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={(e) => handleNavLinkClick(e, "/sobre")}
          >
            Sobre
          </NavLink>
          <Icon className="icon" icon="settings" />
        </nav>
      </div>
      <Icon
        onClick={() => setOpenMenu(true)}
        className="icon btn-menu"
        icon="menu"
      />
    </div>
  );
};

export default Cabecalho;
