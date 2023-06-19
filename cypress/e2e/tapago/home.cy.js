describe('HomeRoute component', () => {
  const email = 'test@test.com'
  const password = 'test'

  beforeEach(() => {
    cy.visit('http://localhost:5173/login')

    cy.get('input[type="email"]').type(email)
    cy.get('input[type="password"]').type(password)

    cy.get('button').contains('Login').click()
  })

  it('should sort posts correctly', () => {
    // Capture the order of posts before sorting
    let initialOrderOfPosts
    cy.get('[class="p-4 border-b border-gray-200"]').then(($divs) => {
      initialOrderOfPosts = $divs.map((i, div) => Cypress.$(div).text()).get()
    })

    // Sort the posts
    cy.get('select[name="sortItems"]').select('Descending')
    cy.wait(500)


    // Verify that the posts have been sorted
    cy.get('[class="p-4 border-b border-gray-200"]').then(($divs) => {
      const sortedOrderOfPosts = $divs.map((i, div) => Cypress.$(div).text()).get()
      expect(sortedOrderOfPosts).to.not.deep.equal(initialOrderOfPosts)
    })
  })
})
