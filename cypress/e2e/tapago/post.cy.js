describe('Post', () => {
  const email = 'test@test.com'
  const password = 'test'

  beforeEach(() => {
    cy.visit('http://localhost:5173/login')
  })

  it('login, navigate and make a new post', () => {
    cy.get('button').contains('Login').click()

    cy.get('input[type="email"]').type(email)
    cy.get('input[type="password"]').type(password)

    cy.get('button').contains('Login').click()

    cy.url().should('include', '/')

    cy.get('button').contains('Upload').click()

    const postContent = 'This is a new post'
    cy.get('[id="caption_input"]').type(postContent)

    cy.get('button').contains('Enviar').click()

  })

  it('checks if the new post is in the list', () => {
    cy.get('button').contains('Login').click()

    cy.get('input[type="email"]').type(email)
    cy.get('input[type="password"]').type(password)

    cy.get('button').contains('Login').click()

    cy.url().should('include', '/')

    cy.get('button').contains('Upload').click()

    const postContent = 'This is a new post'
    cy.get('[id="caption_input"]').type(postContent)

    cy.get('button').contains('Enviar').click()
    cy.contains(postContent)
  })
})
