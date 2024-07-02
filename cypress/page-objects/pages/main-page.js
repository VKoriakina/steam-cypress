const mainMenu = require('../menu/main-menu')

class MainPage{
    async navigateMenu(menu, submenu){
        await mainMenu.navigateMenuItem(menu, submenu);
    }
}
module.exports = new MainPage();