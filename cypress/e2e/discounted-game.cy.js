const browser = require('../framework/browser');
import { getLocalization } from '../page-objects/menu/localization';
const mainPage = require('../page-objects/pages/main-page')
const actionPage =require('../page-objects/pages/action-page')
const gamePage =require('../page-objects/pages/game-page')
const aboutPage =require('../page-objects/pages/about-page')
const ageConfirmPage =require('../page-objects/pages/agecheck-page')

describe('Set framework', () => {
  beforeEach(() => {
    browser.setViewportAndNavigate(1920, 1080);
  });

  it('should select max discounted game', () => {
    const locale = getLocalization();

    cy.log('Navigating to main menu');
    mainPage.navigateMenu(locale.menu, locale.subMenu);

    cy.log('Navigating to discounted games');
    actionPage.navigateDiscounted(locale.menuActions);

    cy.log('Finding game with maximum discount');
    actionPage.findMaxDiscountGame().then((game) => {
      cy.log(`Opening game with maximum discount: ${game.gameName}`);
      actionPage.openMaxDiscountedGame(game.gameLink);
      cy.url().then((url) => {
        if (url.includes('agecheck')) {
          cy.log('Age confirmation page detected, confirming age');
          ageConfirmPage.confirmAge("2","February","1990")
        }
      });
      cy.log('Checking game name');
      gamePage.checkGameName(game.gameName);

      cy.log('Navigating to About page');
      gamePage.navigateAboutPage();
      cy.log('Installing Steam');
      aboutPage.installSteam();
    });

    cy.pause();
  });
});