const mainMenu = require('../menu/main-menu')


class ActionPage{
    constructor() {
        this.elements = {
            rootLocator: () => cy.get(".NO-IPpXzHDNjw_TLDlIo7"),
            discountedLocator: () => this.elements.rootLocator().get('.Discounted ._2fpFvkG2gjtlAHB3ZxS-_7'),
            nameLocator: () => this.elements.rootLocator().get('.StoreSaleWidgetTitle'),
            linkLocator: () => this.elements.rootLocator().get('._2Va3O50Z5ksJJcpvj-JFDI a')
        }
    }

    navigateDiscounted(menu){
        cy.wait(2000);
        cy.scrollTo('bottom');
        mainMenu.navigateDiscount(menu)
    }

    /**
     * Find game with max discount
     * @returns {Promise<{gameName: string, gameLink: string}>}
     */
    async findMaxDiscountGame() {

        const discountsTexts = await this.elements.discountedLocator().invoke('text');

        const discounts = Array.isArray(discountsTexts)
            ? discountsTexts.map(text => Math.abs(Number.parseFloat(text)))
            : [];

        if (discounts.length === 0) {
            throw new Error('No discounts found or unable to parse discounts');
        }

        const maxDiscount = Math.max(...discounts);
        const maxIndex = discounts.indexOf(maxDiscount);

        const gameName = await this.elements.nameLocator().eq(maxIndex).invoke('text');
        const gameLink = await this.elements.linkLocator().eq(maxIndex).invoke('attr', 'href');

        cy.log(`Found game with max discount: ${gameName}, ${gameLink}`);

        return {
            gameName,
            gameLink
        };
    }


    /**
     * Open game with max discount
     * @param {string} url
     * @returns {Promise<void>}
     */
    async openMaxDiscountedGame(url) {
        cy.visit(url);
    }

}
module.exports = new ActionPage();




