import { ValidatorFn, ValidatorFns } from "../types/validatorsTypes";

class InputControl{

    defaultValue : string = ""
    accessor : string = ""
    value : string = ""
    // error : boolean = false // to update
    errors : string[] = []
    validationFns : ValidatorFns | undefined = undefined
    isRequired : boolean = false

    constructor(fieldArgs : {accessor : string, defaultValue : string, isRequired : boolean, validationFns : ValidatorFn | ValidatorFns | undefined}){
        // if(fieldArgs.validationFns && fieldArgs.validationFns.length > 0) console.log(this.#getValidatorId((fieldArgs.validationFns as ValidatorFns)[0]))
        if (fieldArgs == null) return
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        let _validationsFns : ValidatorFns = [/*((_value: string) => true)*/]
        if(fieldArgs.validationFns != null) {
            _validationsFns = Array.isArray(fieldArgs.validationFns) ? fieldArgs.validationFns : [fieldArgs.validationFns]
        }
        // check if accessor not "" and not already existant
        this.defaultValue = fieldArgs.defaultValue
        this.accessor = fieldArgs.accessor
        this.value = fieldArgs.defaultValue || ''
        this.errors = []
        this.validationFns = _validationsFns
        this.isRequired = fieldArgs.isRequired
    }

    validate(){
        if(this.validationFns == null) return true
        this.errors = []
        this.validationFns.forEach(validationFn => {
            if(!validationFn(this.value)) {
                // validationFnsfailed.add(key)
                this.errors.push(this.#getValidationFnName(validationFn))
            }
        })
    }

    #getValidationFnName(validationFn : ValidatorFn){
        return validationFn.prototype.constructor.name
    }
}

export default InputControl