import { ValidatorFn, ValidatorFns } from "../types/validatorsTypes"
import FormControl from "./InputControl"

/**
 * Represents a form group.
 */
export class FormGroup {

    #state : IFormGroup = {}

    /**
     * Constructs a new FormGroup.
     */
    constructor(){
        this.#state = {}
        return this
    }

    getState(){
        return {...this.#state}
    }

    /**
     * Add a new field to the FormGroup.
     * @param {Object} fieldArgs - The arguments to create a new field.
     * @param {string} fieldArgs.accessor - The id to access a target FormGroup field.
     * @param {string} fieldArgs.defaultValue - The default value for the field (optional).
     * @param {ValidatorFn | ValidatorFns | undefined} fieldArgs.validationFn - The validation function for the new field (optional).
     * @param {boolean} fieldArgs.isRequired - Indicates if the field is mandatory.
     * @returns {Object} - The updated FormGroup.
     */
    /*addField(fieldArgs : {accessor : string, defaultValue : string, isRequired : boolean, validationFns : ValidatorFn | ValidatorFns | undefined}){
        // return this to keep chaining possible if this one field can't be added
        if (fieldArgs == null) return this
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        let _validationsFns = [((_value: string) => true)]
        if(fieldArgs.validationFns != null) {
            _validationsFns = Array.isArray(fieldArgs.validationFns) ? fieldArgs.validationFns : [fieldArgs.validationFns]
        }
        // check if accessor not "" and not already existant
        this.#state = {...this.#state, 
            [fieldArgs.accessor] : {
                defaultValue : fieldArgs.defaultValue,
                accessor : fieldArgs.accessor,
                value : fieldArgs.defaultValue || '', 
                error : false, 
                validationFns : _validationsFns,
                isRequired : fieldArgs.isRequired,
        }}
        return this
    }*/

    addField(fieldArgs : {accessor : string, defaultValue : string, isRequired : boolean, validationFns : ValidatorFn | ValidatorFns | undefined}){
        if (fieldArgs == null) return this
        this.#state = {...this.#state,
            [fieldArgs.accessor] : new FormControl(fieldArgs)
        }
    }

    get(accessor : string) : FormControl{
        return this.#state[accessor]
    }

    /*updateFieldValue(fieldAccessor: string, value : string){
        const field = this.#state[fieldAccessor]
        this.#state = {...this.#state, 
            [fieldAccessor] : {
                defaultValue : field.defaultValue,
                accessor : field.accessor,
                value : value || '', 
                errors : [], 
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                validationFns : Array.isArray(field.validationFns) ? field.validationFns : [field.validationFns] || [((_value: string) => true)],
                isRequired : field.isRequired,
        }}
    }*/

    /*#fullValidation(){
        const requiredButMissing = []
        for (const [key, field] of Object.entries(this.#state)) {
            if(field.value === "" && field.isRequired) {
                field.error = true
                requiredButMissing.push(key)
            }
        }

        const validationFnsfailed = new Set()
        for (const [key, field] of Object.entries(this.#state)) {
            field.validationFns.forEach(validationFn => {
                if(!validationFn(field.value)) {
                    validationFnsfailed.add(key)
                }
            })
        }
    }*/

    validation(){

    }

    /**
     * Build the FormGroup.
     * @returns {Object} FormGroup.
     */
    build() {
        // if (Object.keys(this.#state).length === 0) throw new Error("No valid Field defined.")
        return this.#state
    }
}

/*interface IFormGroup{
    [key: string]: IField
}
  
interface IField{
    accessor : string
    defaultValue : string
    validationFns : ValidatorFns
    isRequired : boolean
    error : boolean
    value : string
}*/

interface IFormGroup{
    [key: string]: FormControl
}