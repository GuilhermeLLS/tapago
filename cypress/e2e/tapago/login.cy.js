describe('LoginRoute', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login')
  })

  it('logs in an existing user', () => {
    const email = 'test@test.com'
    const password = 'test'

    cy.get('input[type="email"]').type(email)
    cy.get('input[type="password"]').type(password)

    cy.get('button').contains('Login').click()

    // Verify user is redirected to the home page
    cy.url().should('include', '/')
  })

  it('displays an alert on invalid login', () => {
    const email = 'invalid@example.com'
    const password = 'invalidpassword'

    cy.get('input[type="email"]').type(email)
    cy.get('input[type="password"]').type(password)

    cy.get('button')
      .contains('Login')
      .click()

      cy.on('window:alert', (str) => {
        expect(str).to.contains(`Error`)
      })
  })
})
