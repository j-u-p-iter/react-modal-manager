import * as React from 'react';

import { ModalManagerContext } from './ModalManagerContext';

const { useEffect, useState } = React;

export const ModalManager = ({ Modal: OriginalModal, children }) => {
  const [modalsState, setModalsState] = useState({});

  const createModalToggler = (name) => (show) => {
    const nextState = show || !modalsState[name];

    setModalsState({
      ...modalsState,
      [name]: {
        isOpened: nextState,
      }, 
    });
  };

  const createModalWrapper = (name) => (props) => {
    useEffect(() => {
      if (modalsState[name]) { return; }
      setModalsState({
        ...modalsState,

        [name]: { isOpened: false }, 
      }) 
    }, []);

    const visible = modalsState[name] ? modalsState[name].isOpened : false;
    const toggleModal = createModalToggler(name);

    return (
      <OriginalModal visible={visible} onOk={() => toggleModal()} onCancel={() => toggleModal()} {...props} />
    )
  }

  return (
    <ModalManagerContext.Provider value={
      (name) => ({ 
        Modal: createModalWrapper(name),
        api: { toggleModal: createModalToggler(name) },
        isOpened: modalsState[name] ? modalsState[name].isOpened : false,
      })
    }>
      {children}
    </ModalManagerContext.Provider>
  )
}
