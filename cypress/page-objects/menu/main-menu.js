class MainMenu {
    constructor() {
        this.elements = {
            mainMenuLocator: (item) => cy.xpath(`//a[@class='pulldown_desktop' and text()='${item}']`),
            menuLocator: (item) => cy.xpath(`//div[@data-genre-group="action"]//a[@class='popup_menu_item' and contains(text(), '${item}')]`),
            discountedLocator: (item) => cy.xpath(`//div[contains(text(), '${item}')]`),
            aboutPageLocator: () => cy.get('div.header_installsteam_btn_content')
        };
    }
    navigateMenuItem(menu, submenu) {
        this.elements.mainMenuLocator(menu).should('be.visible').trigger('mouseover');
        this.elements.menuLocator(submenu).click();
    }

    navigateDiscount(menu) {
       this.elements.discountedLocator(menu).click()
    }

    navigateAbout()
    {
        this.elements.aboutPageLocator().click()
    }
}
module.exports = new MainMenu();


