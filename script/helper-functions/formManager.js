import { FormValidator } from './FormValidator.js';
import { fakturaMessage } from "../models/formInterface/FakturaMessage.js";
export class FormMenadzer {
    constructor(formElements, formValidation, elementsAlerts) {
        this.formElements = formElements;
        this.formElementsValidation = formValidation;
        this.elementsAlerts = elementsAlerts;
    }
    // return jquery element based on name of element(id)
    getElementByName(elementId) {
        if (elementId in this.formElements) {
            return this.formElements[elementId];
        }
    }
    // Form Validation
    getElementValidity(elementName) {
        return this.formElementsValidation[elementName];
    }
    setElementValidity(elementName, newValue) {
        this.formElementsValidation[elementName] = newValue;
        let isValid = this.getElementValidity(elementName);
        let message = fakturaMessage(elementName, isValid);
        let elementAlert = this.getAlertElement(elementName);
        return [isValid, message, elementAlert];
    }
    getAlertElement(alertName) {
        return this.elementsAlerts[alertName];
    }
    validateElement(element) {
        let elementName = element.attr("id");
        switch (elementName) {
            case "pibKupuje":
            case "pibProdaje":
                return this.setElementValidity(elementName, FormValidator.validatePib(element.val()));
            case "datumGenerisanja":
            case "datumValute":
                return this.setElementValidity(elementName, FormValidator.validateDate(element.val()));
            case "nazivStavke":
                return this.setElementValidity(elementName, FormValidator.validateItemName(element.val()));
            case "kolicinaStavke":
                return this.setElementValidity(elementName, FormValidator.validateItemAmount(element.val()));
            case "cenaStavke":
                return this.setElementValidity(elementName, FormValidator.validateItemAmount(element.val()));
            case "jedinicaMere":
                return this.setElementValidity(elementName, FormValidator.validateItemName(element.val()));
        }
    }
}
