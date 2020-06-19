import { useContext } from "react";

import { ModalManagerContext } from "./ModalManagerContext";

export const useModalManager = modalName => {
  const createValue = useContext(ModalManagerContext);

  return createValue(modalName);
};
