describe('Inventory Page', () => {
  it('Is able to access the Page', () => {
    cy.visit('/');
    cy.get('h1').should('contain', 'Inventory');
  });

  cy.intercept('/products').as('fetchProducts');
  it('Properly Fetches Products on Load', () => {
    cy.visit('/');
    cy.wait('@fetchProducts').then(({ response }) => {
      expect(response?.statusCode).to.equal(200);
      expect(response?.body).to.be.an('array');
    });
  });

  it('Properly Displays UI with Products', () => {
    cy.visit('/');
    cy.wait('@fetchProducts');
    cy.get('h2').should('contain', 'Products');
    // Validate Filters Section
    cy.get('[data-cy="product-type"]').should('exist');
    cy.get('[data-cy="input-search"]').should('exist');
    cy.get('[data-cy="items-per-page"]').should('exist');

    // Validate Cards Section
    cy.get('[data-cy="products-section"]').should('exist');
    cy.get('[data-cy="product-card-1"]').should('exist');

    // Validate Pagination Section
    cy.get('[data-cy="pagination-section"]').should('exist');
  });

  it('Properly Filters Products', () => {
    cy.visit('/');
    cy.wait('@fetchProducts');
    const selectedValue = cy.get('[data-cy="product-type"]').select(1);
    cy.get('[data-cy="product-card-1"]')
      .should('exist')
      .and('contain', selectedValue);

    // Hardcode Breakfast Search
    const searchInput = cy.get('[data-cy="input-search"]').type('Breakfast');
    cy.get('[data-cy="product-card-1"]')
      .should('exist')
      .and('contain', searchInput);
  });

  it('Properly Changes Items Per Page', () => {
    cy.visit('/');
    cy.wait('@fetchProducts');
    const selectedValue = cy.get('[data-cy="items-per-page"]').select(3);
    cy.get('[data-cy="products-section"]').should('have.length', selectedValue);
  });

  it('Properly Paginates Products', () => {
    cy.visit('/');
    cy.wait('@fetchProducts');
    cy.get('[data-cy="pagination-section"]').should('exist');

    // Get Card 1 on Page 1
    const initialCardName = cy.get('[data-cy="product-card-1"]').invoke('h3');
    cy.get('[data-cy="pagination-next"]').click();

    // Get Card 1 on Page 2
    const newCardName = cy.get('[data-cy="product-card-1"]').invoke('h3');
    expect(initialCardName).to.not.equal(newCardName);

    // Get Card 1 on Page 1
    cy.get('[data-cy="pagination-prev"]').click();
    cy.get('[data-cy="product-card-1"]')
      .invoke('h3')
      .should('equal', initialCardName);
  });
});
