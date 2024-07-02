const path = require('path');
const fs = require('fs');

class AboutPage {
    constructor() {
    this.elements = {
        installLocator: () => cy.xpath('//div[@class="about_greeting_header"]/following-sibling::div')
    }
    }

    installSteam() {
        const downloadDir = Cypress.config('downloadsFolder'); // Folder for downloads
        cy.task('deleteFolder', { path: downloadDir });
        cy.window().then((win) => {
            cy.stub(win, 'open').callsFake((url) => {
                cy.customDownloadFile(url, downloadDir);
            });
        });

        this.elements.installLocator().click();
        cy.get('@customDownloadedFile').then((filePath) => {
            cy.readFile(filePath).should('exist');
            cy.task('deleteFile', { filePath });
        });
    }
}

module.exports = new AboutPage()