/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      setViewport(device: 'mobile' | 'tablet' | 'desktop'): Chainable<void>;
      clearAuth(): Chainable<void>;
      login(email: string, password: string): Chainable<void>;
      waitForPageLoad(): Chainable<void>;
    }
  }
}

export {};
