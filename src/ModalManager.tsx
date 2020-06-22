import * as React from "react";

import { ModalManagerContext } from "./ModalManagerContext";

const { useEffect, useState } = React;

interface ModalManagerProps {
  Modal: React.FC;
  stateToToggle: string;
  methodsToToggle: string[];
  children: React.ReactNode;
}

export const ModalManager: React.FC<ModalManagerProps> = ({
  Modal: OriginalModal,
  stateToToggle,
  methodsToToggle,
  children
}) => {
  const [modalsState, setModalsState] = useState({});

  const createModalToggler = (name: string) => (show?: boolean) => {
    const nextState = show || !modalsState[name];

    setModalsState({
      ...modalsState,
      [name]: {
        isOpened: nextState
      }
    });
  };

  const createModalWrapper = name => props => {
    useEffect(() => {
      if (modalsState[name]) {
        return;
      }
      setModalsState({
        ...modalsState,

        [name]: { isOpened: false }
      });
    }, []);

    const isOpened = modalsState[name] ? modalsState[name].isOpened : false;
    const toggleModal = createModalToggler(name);

    const resultProps = methodsToToggle.reduce(
      (result, methodName) => {
        return { ...result, [methodName]: () => toggleModal() };
      },
      { [stateToToggle]: isOpened, ...props }
    );

    return <OriginalModal {...resultProps} />;
  };

  return (
    <ModalManagerContext.Provider
      value={name => ({
        Modal: createModalWrapper(name),
        api: { toggleModal: createModalToggler(name) },
        isOpened: modalsState[name] ? modalsState[name].isOpened : false
      })}
    >
      {children}
    </ModalManagerContext.Provider>
  );
};
