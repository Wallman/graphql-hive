describe('preflight script', () => {
  before(() => {
    cy.task('deleteUser')
    cy.task('createUser').then(result => {
      cy.task('createOrganization', result.sAccessToken)
    })
  });

  beforeEach(() => {
    cy.task('login').then(result => {
      cy.setCookie('sRefreshToken', result.sRefreshToken);
    });
  });


  it('should be visitable', () => {
    cy.visit('/');
  });
});
