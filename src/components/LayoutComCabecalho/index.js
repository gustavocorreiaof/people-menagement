import Cabecalho from "../Cabecalho";
import ModalMenu from "../ModalMenu";
import { useState } from "react";

const LayoutComCabecalho = ({ children }) => {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <>
      <Cabecalho setOpenMenu={setOpenMenu} />
      <main>{children}</main>
      <ModalMenu openMenu={openMenu} setOpenMenu={setOpenMenu}></ModalMenu>
    </>
  );
};

export default LayoutComCabecalho;
