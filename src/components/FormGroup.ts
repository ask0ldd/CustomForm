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
     * @param {(value: string) => boolean} fieldArgs.validationFn - The validation function for the new field (optional).
     * @param {boolean} fieldArgs.isRequired - Indicates if the field is mandatory.
     * @returns {Object} - The updated FormGroup.
     */
    addField(fieldArgs : {accessor : string, defaultValue : string, isRequired : boolean, validationFns : ValidatorFn | ValidatorFns | undefined}){
        // return this to keep chaining possible if this one field can't be added
        if (fieldArgs == null) return this
        // chain if accessor not "" and not already existant
        this.#state = {...this.#state, 
            [fieldArgs.accessor] : {
                defaultValue : fieldArgs.defaultValue,
                accessor : fieldArgs.accessor,
                value : fieldArgs.defaultValue || '', 
                error : false, 
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                validationFns : Array.isArray(fieldArgs.validationFns) ? fieldArgs.validationFns : [fieldArgs.validationFns] || [((_value: string) => true)],
                isRequired : fieldArgs.isRequired,
        }}
        return this
    }

    updateField(fieldAccessor: string, value : string){
        const field = this.#state[fieldAccessor]
        this.#state = {...this.#state, 
            [fieldAccessor] : {
                defaultValue : field.defaultValue,
                accessor : field.accessor,
                value : value || '', 
                error : field.error, 
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                validationFns : Array.isArray(field.validationFns) ? field.validationFns : [field.validationFns] || [((_value: string) => true)],
                isRequired : field.isRequired,
        }}
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

export interface IFormGroup{
    [key: string]: IField
  }
  
  interface IField{
    accessor : string
    defaultValue : string
    validationFns : ValidatorFns | ValidatorFn
    isRequired : boolean
    error : boolean
    value : string
  }

  type ValidatorFn = (value: string) => boolean
  type ValidatorFns = ValidatorFn[]