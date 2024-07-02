const mainMenu = require('../menu/main-menu')

class GamePage{
    constructor() {
        this.elements ={
            currentNameLocator: () => cy.get("#appHubAppName")
        }
    }

    checkGameName(name) {
        this.elements.currentNameLocator()
            .invoke('text')
            .then((currentGameName) => {
                expect(currentGameName).to.equal(name);
            });
    }
    navigateAboutPage() {
        mainMenu.navigateAbout()
    }
}

module.exports = new GamePage()