// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
const path = require('path');

Cypress.Commands.add('customDownloadFile', (url, dir) => {
    cy.request({
        url,
        encoding: 'binary'
    }).then((response) => {
        const disposition = response.headers['content-disposition'];
        const fileName = disposition ? disposition.split('filename=')[1].split(';')[0].replace(/"/g, '') : 'downloaded-file';

        const filePath = path.join(dir, fileName);

        cy.writeFile(filePath, response.body, 'binary').then(() => {
            cy.wrap(filePath).as('customDownloadedFile');  // Set the alias here
        });
    });
});