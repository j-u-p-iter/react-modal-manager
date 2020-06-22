const checkOpening = () => {
  cy.get('[data-cy="firstModalContent"]').should('not.exist');
  cy.get('[data-cy="secondModalContent"]').should('not.exist');

  cy.get('[data-cy="firstModalToggler"]').click();

  cy.get('[data-cy="firstModalContent"]');

  cy.get('[data-cy="secondModalContent"]').should('not.exist');

  cy.get('[data-cy="secondModalToggler"]').click();

  cy.get('[data-cy="secondModalContent"]');
  cy.get('[data-cy="firstModalContent"]');
}

const checkClosing = ({ 
  selectorToCloseFirstModal, 
  selectorToCloseSecondModal, 
}) => {
  cy.get(selectorToCloseFirstModal).click();

  cy.get('[data-cy="firstModalContent"]').should('not.exist');

  cy.get('[data-cy="secondModalContent"]');

  cy.get(selectorToCloseSecondModal).click();

  cy.get('[data-cy="secondModalContent"]').should('not.exist');
}

describe("ModalManager", () => {
  beforeEach(() => {
    cy.visit('http://localhost:1234');
  });

  describe('opens and closes each modal separately', () => {
    it('when close by clicking on close icon', () => {
      checkOpening();

      checkClosing({ 
        selectorToCloseFirstModal: '[data-cy="firstModalCloseIcon"]',
        selectorToCloseSecondModal: '[data-cy="secondModalCloseIcon"]',
      })
    });

    it('when close by clicking on custom button', () => {
      checkOpening();

      checkClosing({ 
        selectorToCloseFirstModal: '[data-cy="firstModalCustomButton"]',
        selectorToCloseSecondModal: '[data-cy="secondModalCustomButton"]',
      })
    });

    it('when close by clicking on custom button', () => {
      checkOpening();

      checkClosing({ 
        selectorToCloseFirstModal: '[data-cy="firstModalCustomButton"]',
        selectorToCloseSecondModal: '[data-cy="secondModalCustomButton"]',
      })
    });
  });
});
