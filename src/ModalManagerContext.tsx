import { createContext, FC } from 'react';

type ModalManagerFactory = (name: string) => {
  api: { toggleModal: (show: boolean) => void; }
  Modal: FC;
  isOpened: boolean;
}

const defaultModalManagerFactory: ModalManagerFactory = () => ({
  Modal: () => null,
  api: { 
    toggleModal: () => {},
  },
  isOpened: false,
});

export const ModalManagerContext = createContext<ModalManagerFactory>(defaultModalManagerFactory);
