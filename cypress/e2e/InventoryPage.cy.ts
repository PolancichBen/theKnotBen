describe('Inventory Page', () => {
  it('Is able to access the Page', () => {
    cy.visit('/');
    cy.get('h1').should('contain', 'Inventory');
  });

  it('Properly Fetches Products on Load', () => {
    cy.intercept('/products').as('fetchProducts');
    cy.visit('/');
    cy.wait('@fetchProducts').then(({ response }) => {
      expect(response?.statusCode).to.equal(200);
      expect(response?.body).to.be.an('array');
    });
  });

  it('Properly Displays UI with Products', () => {
    cy.intercept('/products').as('fetchProducts');
    cy.visit('/');
    cy.wait('@fetchProducts');
    cy.get('h2').should('contain', 'Products');
    // Validate Filters Section
    cy.get('[data-cy="product-type"]').should('exist');
    cy.get('[data-cy="input-search"]').should('exist');
    cy.get('[data-cy="items-per-page"]').should('exist');

    // Validate Cards Section
    cy.get('[data-cy="products-section"]').should('exist');
    cy.get('[data-cy="product-card-0"]').should('exist');

    // Validate Pagination Section
    cy.get('[data-cy="pagination-section"]').should('exist');
  });

  it('Properly Filters Products', () => {
    cy.intercept('/products').as('fetchProducts');
    cy.visit('/');
    cy.wait('@fetchProducts');
    cy.get('[data-cy="product-type"]').select(1);
    cy.get('[data-cy="product-card-0"]').should('exist');

    // Hardcode Breakfast Search
    cy.get('[data-cy="input-search"]').type('Break', { delay: 100 });
    cy.get('[data-cy="product-card-0"]')
      .should('exist')
      .and('contain', 'Break');
  });

  it('Properly Changes Items Per Page', () => {
    cy.intercept('/products').as('fetchProducts');
    cy.visit('/');
    cy.wait('@fetchProducts');
    cy.get('[data-cy="items-per-page"]').select(2);
    cy.get('[data-cy="products-section"]').children().should('have.length', 25);
  });

  it('Properly Shows Product Details', () => {
    cy.intercept('/products').as('fetchProducts');
    cy.visit('/');
    cy.wait('@fetchProducts');
    cy.get('[data-cy="product-card-0-product-details"]').should('not.exist');
    cy.get('[data-cy="product-card-0"]').click();
    cy.get('[data-cy="product-card-0-product-details"]').should('exist');
    cy.get('[data-cy="product-card-0"]').should('contain', 'Price');
    cy.get('[data-cy="product-card-0"]').click();
    cy.get('[data-cy="product-card-0-product-details"]').should('not.exist');
  });

  it('Properly Paginates Products', () => {
    cy.intercept('/products').as('fetchProducts');
    cy.visit('/');
    cy.wait('@fetchProducts');
    cy.get('[data-cy="pagination-section"]').should('exist');

    // Ensure Prev is Disabled and Next and Not Disabled
    cy.get('[data-cy="pagination-prev"]').should('be.disabled');
    cy.get('[data-cy="pagination-next"]').should('not.be.disabled');

    // Go to Last Page
    cy.get('[data-cy="pagination-4"]').click();
    cy.get('[data-cy="pagination-next"]').should('be.disabled');
    cy.get('[data-cy="pagination-prev"]').should('not.be.disabled');

    // Go to Mid
    cy.get('[data-cy="pagination-2"]').click();
    cy.get('[data-cy="pagination-next"]').should('not.be.disabled');
    cy.get('[data-cy="pagination-prev"]').should('not.be.disabled');
  });
});
