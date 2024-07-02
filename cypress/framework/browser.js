
class Browser {

    setViewportAndNavigate(width, height, url = '/') {
        cy.viewport(width, height);
        cy.log('Open site');
        cy.visit(url);
    }
}

module.exports = new Browser();