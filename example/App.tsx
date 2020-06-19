import * as React from 'react';

import { ModalManager, useModalManager } from '../src';
import { Modal } from 'antd';


const FirstModal = ({ children }) => {
  const { 
    Modal, 
    api: { toggleModal },
  } = useModalManager('FirstModal');

  return (
    <>
      <button onClick={() => toggleModal(true)}>Show first modal</button>

      <Modal>{children}</Modal>
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
      <button onClick={() => toggleModal(true)}>Show second modal</button>

      <Modal>{children}</Modal>
    </>
  )
} 

export const App = () => {
  return (
    <ModalManager Modal={Modal}>
      <FirstModal>    
        First Modal
      </FirstModal>

      <SecondModal> 
        Second Modal
      </SecondModal>
    </ModalManager>
  ); 
}
