import { ValidatorFn, ValidatorFns } from "../types/validatorsTypes";

export default class FormControl{

    defaultValue : string = ""
    accessor : string = ""
    value : string = ""
    error : boolean = false // to update
    validationFns : ValidatorFns | undefined = undefined
    isRequired : boolean = false

    constructor(fieldArgs : {accessor : string, defaultValue : string, isRequired : boolean, validationFns : ValidatorFn | ValidatorFns | undefined}){
        if (fieldArgs == null) return
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        let _validationsFns = [((_value: string) => true)]
        if(fieldArgs.validationFns != null) {
            _validationsFns = Array.isArray(fieldArgs.validationFns) ? fieldArgs.validationFns : [fieldArgs.validationFns]
        }
        // check if accessor not "" and not already existant
        this.defaultValue = fieldArgs.defaultValue
        this.accessor = fieldArgs.accessor
        this.value = fieldArgs.defaultValue || ''
        this.error = false
        this.validationFns = _validationsFns
        this.isRequired = fieldArgs.isRequired
    }


}