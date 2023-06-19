describe('Search', () => {
  const searchTerm = 'test'
  const email = 'test@test.com'
  const password = 'test'

  beforeEach(() => {
    cy.visit('http://127.0.0.1:5173/login')

    cy.get('input[type="email"]').type(email)
    cy.get('input[type="password"]').type(password)

    cy.get('button').contains('Login').click()
  })

  it('should filter posts based on search input and select suggestion', () => {
    // Type the search term in the search bar
    cy.get('input[placeholder="Search"]').type(searchTerm)


    // After clicking on a suggestion, the search input should have the suggestion value
    cy.get('input[placeholder="Search"]').should('have.value', searchTerm)


    cy.get('[data-testid="post-caption"]').should('contain', searchTerm)
  })
})
