class AgeConfirmPage {
    constructor() {
        this.elements = {
            dateLocator:() => cy.xpath('//select[@id ="ageDay"]'),
            monthLocator:() => cy.xpath(`//select[@id ='ageMonth']`),
            yearLocator:() => cy.xpath(`//select[@id ='ageYear']`),
            btnViewLocator: '#view_product_page_btn'
        };
    }

    confirmAge(date, month, year){
        // Проверка существования элементов и их опций
        this.elements.dateLocator().should('exist').then((dateSelect) => {
            cy.log('Date select options:', dateSelect.find('option').map((i, option) => option.value).get());
        });

        this.elements.monthLocator().should('exist').then((monthSelect) => {
            cy.log('Month select options:', monthSelect.find('option').map((i, option) => option.value).get());
        });

        this.elements.yearLocator().should('exist').then((yearSelect) => {
            cy.log('Year select options:', yearSelect.find('option').map((i, option) => option.value).get());
        });

        this.elements.dateLocator().select(date);
        this.elements.monthLocator().select(month);
        this.elements.yearLocator().select(year);
        cy.get(this.elements.btnViewLocator).click()
    }
}

module.exports = new AgeConfirmPage()