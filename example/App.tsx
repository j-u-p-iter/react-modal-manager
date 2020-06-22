import * as React from 'react';

import { ModalManager, useModalManager } from '../src';
import { Modal } from 'antd';


const CloseIcon = ({ attrName }) => {
  return <span data-cy={attrName}>x</span>;
}

const FirstModal = ({ children }) => {
  const { 
    Modal, 
    api: { toggleModal },
  } = useModalManager('FirstModal');

  return (
    <>
      <button data-cy='firstModalToggler' onClick={() => toggleModal(true)}>Show first modal</button>

      <Modal 
        closeIcon={<CloseIcon attrName='firstModalCloseIcon' />}
      >
        <div data-cy='firstModalContent'>
          {children}
          <button 
            data-cy='firstModalCustomButton' 
            onClick={() => toggleModal()}
          >
            Close first modal with custom button
          </button>
        </div>
      </Modal>
    </>
  )
} 

const SecondModal = ({ children }) => {
  const { 
    Modal, 
    api: { toggleModal },
  } = useModalManager('SecondModal');

  return (
    <>
      <button data-cy='secondModalToggler' onClick={() => toggleModal(true)}>Show second modal</button>

      <Modal
        closeIcon={<CloseIcon attrName='secondModalCloseIcon' />}
      >
        <div data-cy='secondModalContent'>
          {children}
          <button 
            data-cy='secondModalCustomButton' 
            onClick={() => toggleModal()}
          >
            Close second modal with custom button
          </button>
        </div>
      </Modal>
    </>
  )
} 

export const App = () => {
  return (
    <ModalManager Modal={Modal} stateToToggle='visible' methodsToToggle={['onOk', 'onCancel']}>
      <FirstModal>    
        First Modal
      </FirstModal>

      <SecondModal> 
        Second Modal
      </SecondModal>
    </ModalManager>
  ); 
}
