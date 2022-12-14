class AppPage {

    get toast() { return $('.toast-message'); }
    get navbarLeft() { return $('.navbar-nav'); }
    get mainContent() { return $('.main_content'); }
    get pageHeader() { return $('h1'); }
    get contentHeader() { return this.mainContent.$('h3'); }

    getToastMessage() {
        this.toast.waitForDisplayed();
        return this.toast.getText();
    }

    navbarSection(sectionText) {
        /*
        Jednodušší řešení by bylo použít:
        this.navbarLeft.$(`*=${sectionText}`).click();

        Složitější řešení nám dává trochu více jistoty, že klikáme na správný odkaz.
         */

        this.navbarLeft.$$('.dropdown').find(item => {
            return item.getText() === sectionText;
        }).click();
    }

    navbarItem(itemText) {
        /*
         Jednodušší řešení:
         this.navbarLeft.$(`*=${itemText}`).click();
         */

        this.navbarLeft.$$('.dropdown-item').find(item => {
            return item.getText() === itemText;
        }).click();
    }

    navbar(sectionText, itemText) {
        this.navbarSection(sectionText);
        this.navbarItem(itemText);
    }

}

module.exports = AppPage;
