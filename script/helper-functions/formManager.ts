import { FakturaForm, FakturaValidation } from "../models/formInterface/FakturaForm";
import { PreduzeceForm, PreduzeceValidation } from "../models/formInterface/PreduzeceForm";
import { FakturaAlert } from "../models/formInterface/FakturaAlert.js";
import { PreduzeceAlert } from "../models/formInterface/PreduzeceAlert.js";
import { FormValidator } from './FormValidator.js'
import { fakturaMessage } from "../models/formInterface/FakturaMessage.js";

type validateResult = [boolean,string,JQuery];


export class FormMenadzer {
    private formElements: PreduzeceForm | FakturaForm;
    private formElementsValidation: FakturaValidation | PreduzeceValidation;
    private elementsAlerts: FakturaAlert | PreduzeceAlert;

    constructor(formElements: PreduzeceForm | FakturaForm, formValidation: FakturaValidation | PreduzeceValidation, elementsAlerts:FakturaAlert | PreduzeceAlert) {
        this.formElements = formElements;
        this.formElementsValidation = formValidation;
        this.elementsAlerts = elementsAlerts;
    }
    // return jquery element based on name of element(id)
    getElementByName(elementId: string): JQuery | undefined {
        if (elementId in this.formElements) {
            return this.formElements[elementId as keyof (PreduzeceForm | FakturaForm)];
        }
    }
    // Form Validation

    getElementValidity(elementName: string) {
        return this.formElementsValidation[elementName as keyof(FakturaValidation | PreduzeceValidation)];
    }

    setElementValidity(elementName:string,newValue:boolean):validateResult{
        
        this.formElementsValidation[elementName as keyof (FakturaValidation | PreduzeceValidation)] = newValue

        let isValid: boolean = this.getElementValidity(elementName);
        let message: string = fakturaMessage(elementName, isValid);
        let elementAlert: JQuery = this.getAlertElement(elementName);

        return [isValid,message,elementAlert]
        
    }

    getAlertElement(alertName:string){
        return this.elementsAlerts[alertName as keyof(FakturaAlert | PreduzeceAlert)];
    }

    validateElement(element:JQuery):validateResult{
        let elementName:string = element.attr("id");
        
        switch(elementName){
            case "pibKupuje":
            case "pibProdaje":
                return this.setElementValidity(elementName,FormValidator.validatePib(element.val()));
                
            case "datumGenerisanja":
            case "datumValute":
                return this.setElementValidity(elementName, FormValidator.validateDate(element.val()));
            case "nazivStavke":
                return this.setElementValidity(elementName,FormValidator.validateItemName(element.val()))
            case "kolicinaStavke":
                return this.setElementValidity(elementName, FormValidator.validateItemAmount(element.val()))
            case "cenaStavke":
                return this.setElementValidity(elementName, FormValidator.validateItemAmount(element.val()))
            case "jedinicaMere":
                return this.setElementValidity(elementName, FormValidator.validateItemName(element.val()))
            
        }
    }


    

}