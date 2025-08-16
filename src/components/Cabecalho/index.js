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
    { page: "Palestras", path: "/PaginaInicial", value: 0 },
    { page: "Sobre", path: "/sobre", value: 1 },
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
            src={"https://i.imgur.com/F6d8nRp.png"}
            alt="Logo"
          />
        </div>

        <div className="title">
          <span className="firstWord">Ferreira </span>{" "}
          <span className="secondWord">Costa</span>
        </div>
      </div>
      <div className="titleMinifyed">
        <span>F</span>
        <span style={{ color: "var(--second-color)" }}>C</span>
      </div>
      <div className="left">
        <nav className="navBar">
          <NavLink
            to="/PaginaInicial"
            className={({ isActive }) => (isActive ? "active" : "")}
            end
            onClick={(e) => handleNavLinkClick(e, "/PaginaInicial")}
          >
            Home
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
