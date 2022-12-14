import AppPage from './app.page';
import {getFieldValueById} from "./functions";

class OrderNewPage extends AppPage {

    constructor() {
        super();
        this._companyIdFieldId = 'ico';
        this._clientFieldId = 'client';
        this._addressFieldId = 'address';
        this._substituteFieldId = 'substitute';
        this._contactNameFieldId = 'contact_name';
        this._contactPhoneFieldId = 'contact_tel';
        this._contactEmailFieldId = 'contact_mail';
        this._startDate1Id = 'start_date_1';
        this._endDate1Id = 'end_date_1';
    }

    get companyIdField() { return this.mainContent.$(`#${this._companyIdFieldId}`); }
    get clientField() { return this.mainContent.$(`#${this._clientFieldId}`); }
    get addressField() { return this.mainContent.$(`#${this._addressFieldId}`); }
    get substituteField() { return this.mainContent.$(`#${this._substituteFieldId}`); }
    get contactNameField() { return this.mainContent.$(`#${this._contactNameFieldId}`); }
    get contactPhoneField() { return this.mainContent.$(`#${this._contactPhoneFieldId}`); }
    get contactEmailField() { return this.mainContent.$(`#${this._contactEmailFieldId}`); }
    get startDateField() { return this.mainContent.$(`#${this._startDate1Id}`); }
    get endDateField() { return this.mainContent.$(`#${this._endDate1Id}`); }
    get tabSelector() { return this.mainContent.$('#nav-tab'); }
    get submitButton() { return this.mainContent.$('.btn-primary'); }
    get orderConfirmationText() { return $('.card-body').$('p'); }
    get suburbanCampForm() { return new SuburbanCampForm(); }

    get filledValues() {
        return {
            companyId: getFieldValueById(this._companyIdFieldId),
            client: getFieldValueById(this._clientFieldId),
            address: getFieldValueById(this._addressFieldId),
            substitute: getFieldValueById(this._substituteFieldId),
            contactName: getFieldValueById(this._contactNameFieldId),
            contactPhone: getFieldValueById(this._contactPhoneFieldId),
            contactEmail: getFieldValueById(this._contactEmailFieldId),
            startDate: getFieldValueById(this._startDate1Id),
            endDate: getFieldValueById(this._endDate1Id),
        }
    }

    setCompanyId(value) {
        this.companyIdField.setValue(value);
        browser.keys('Enter');
    }

    setClientName(value) {
        this.clientField.setValue(value);
    }

    setAddress(value) {
        this.addressField.setValue(value);
    }

    setSubstitute(value) {
        this.substituteField.setValue(value);
    }

    setContactName(value) {
        this.contactNameField.setValue(value);
    }

    setContactPhone(value) {
        this.contactPhoneField.setValue(value);
    }

    setContactEmail(value) {
        this.contactEmailField.setValue(value);
    }

    setStartDate(value) {
        this.startDateField.setValue(value);
    }

    setEndDate(value) {
        this.endDateField.setValue(value);
    }

    selectType(name) {
        this.tabSelector.$(`=${name}`).click();
    }

    submit() {
        this.submitButton.click();
    }
}

class SuburbanCampForm {

    get campDateSelector() { return $('#camp-date_part'); }
    get numberOfStudentsField() { return $('#camp-students'); }
    get numberStudentAgeField() { return $('#camp-age'); }
    get numberNumberOfAdultsField() { return $('#camp-adults'); }

    setTerm(value) {
        this.campDateSelector.selectByVisibleText(value);
    }

    setNumberOfStudents(value) {
        this.numberOfStudentsField.setValue(value);
    }

    setStudentAge(value) {
        this.numberStudentAgeField.setValue(value);
    }

    setNumberOfAdults(value) {
        this.numberNumberOfAdultsField.setValue(value);
    }
}

module.exports = new OrderNewPage();
