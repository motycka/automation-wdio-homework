import {
    ICO,
    clientName,
    address,
    substituteName,
    contactName,
    contactPhone,
    contactEmail,
    startDate,
    endDate
} from './fixtures.js'
import OrderPage from '../pages/order-new.page'

const NAVBAR_TEACHERS = 'Pro učitelé';
const NAVBAR_NEW_ORDER = 'Objednávka pro MŠ/ZŠ';
const ORDER_PAGE_TITLE = 'Nová objednávka';
const ORDER_FORM_TITLE = 'Objednávka akce';
const SUBURBAN_CAMP = 'Příměstský tábor';
const AFTERNOON = 'Odpolední';
const CHILDREN = 23;
const AGE = '8-12';
const ADULTS = 3;
const ORDER_SUCCESS = 'Děkujeme za objednávku';
const ORDER_SUCCESS_MESSAGE = 'Objednávka byla úspěšně uložena a bude zpracována. O postupu vás budeme informovat. Zkontrolujte si také složku SPAM';
const ARES_OK_TOAST = 'Data z ARESu úspěšně načtena';
const ORDER_SUCCESS_TOAST = 'Objednávka byla úspěšně uložena';

describe('Objednávka pro MŠ/ZŠ', () => {

    beforeEach(() => {
        browser.reloadSession();
        browser.url('/');
    });

    describe('Navigace', () => {

        it('Aplikace umožňuje uživateli v menu Pro učitele vytvoření nové objednávky pro MŠ/ZŠ', () => {
            OrderPage.navbar(NAVBAR_TEACHERS, NAVBAR_NEW_ORDER);
            expect(OrderPage.pageHeader).toHaveText(ORDER_PAGE_TITLE);
            expect(OrderPage.contentHeader).toHaveText(ORDER_FORM_TITLE);
        });

    });

    describe('Aplikace umožňuje vytvoření nové objednávky pro MŠ/ZŠ', () => {

        beforeEach(() => {
            OrderPage.navbar(NAVBAR_TEACHERS, NAVBAR_NEW_ORDER);
        })

        it('Po vyplnění IČO do formuláře Objednávka pro MŠ/ZŠ se automaticky načte jméno odběratele a adresa odběratele z ARESu', () => {
            OrderPage.setCompanyId(ICO);
            expect(OrderPage.getToastMessage()).toEqual(ARES_OK_TOAST);

            const values = OrderPage.filledValues
            expect(values.client).toEqual(clientName);
            expect(values.address).toEqual(address);

        });

        it('Uživatel nemůže uložit špatně vyplněnou přihlášku', () => {
            OrderPage.setCompanyId(ICO);
            expect(OrderPage.getToastMessage()).toEqual(ARES_OK_TOAST);

            OrderPage.setClientName(clientName);
            OrderPage.setAddress(address);
            OrderPage.setSubstitute(substituteName);
            OrderPage.setContactName(contactName);
            OrderPage.setContactPhone(contactPhone);
            OrderPage.setContactEmail(contactEmail);
            // missing date
            OrderPage.selectType(SUBURBAN_CAMP);

            const suburbanCampForm = OrderPage.suburbanCampForm
            suburbanCampForm.setTerm(AFTERNOON);
            suburbanCampForm.setNumberOfStudents(CHILDREN);
            suburbanCampForm.setStudentAge(AGE);
            suburbanCampForm.setNumberOfAdults(ADULTS);
            OrderPage.submit();

            expect(OrderPage.pageHeader).toHaveText(ORDER_PAGE_TITLE);
            expect(OrderPage.contentHeader).toHaveText(ORDER_FORM_TITLE);

        });

        it('Uživatel může uložit vyplněnou přihlášku na příměstský tábor', () => {
            OrderPage.setCompanyId(ICO);
            expect(OrderPage.getToastMessage()).toEqual(ARES_OK_TOAST);

            OrderPage.setClientName(clientName);
            OrderPage.setAddress(address);
            OrderPage.setSubstitute(substituteName);
            OrderPage.setContactName(contactName);
            OrderPage.setContactPhone(contactPhone);
            OrderPage.setContactEmail(contactEmail);
            OrderPage.setStartDate(startDate);
            OrderPage.setEndDate(endDate);
            OrderPage.selectType(SUBURBAN_CAMP);

            const suburbanCampForm = OrderPage.suburbanCampForm
            suburbanCampForm.setTerm(AFTERNOON);
            suburbanCampForm.setNumberOfStudents(CHILDREN);
            suburbanCampForm.setStudentAge(AGE);
            suburbanCampForm.setNumberOfAdults(ADULTS);
            OrderPage.submit();

            expect(OrderPage.getToastMessage()).toEqual(ORDER_SUCCESS_TOAST);
            expect(OrderPage.contentHeader).toHaveText(ORDER_SUCCESS);
            expect(OrderPage.orderConfirmationText).toHaveText(ORDER_SUCCESS_MESSAGE);
        });

    });

});
