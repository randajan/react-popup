import React, { useEffect } from 'react';

import Modal from "../../Mods/Modal";

function PopUp(props) {
  const pop = Modal.usePop(props);
  useEffect(_=>{pop.up(props)});
  return null;
}

export default PopUp;
