import { ValidatorFn, ValidatorFns } from "../types/validatorsTypes"
import InputControl from "./InputControl"

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

    /*addField(fieldArgs : {accessor : string, defaultValue : string, isRequired : boolean, validationFns : ValidatorFn | ValidatorFns | undefined}){
        if (fieldArgs == null) return this
        this.#state = {...this.#state,
            [fieldArgs.accessor] : new InputControl(fieldArgs)
        }
    }*/

    addInputControl(fieldArgs : {accessor : string, defaultValue : string, isRequired : boolean, validationFns : ValidatorFn | ValidatorFns | undefined}){
        if (fieldArgs == null) return this
        this.#state = {...this.#state,
            [fieldArgs.accessor] : new InputControl(fieldArgs)
        }
    }

    get(accessor : string) : InputControl{
        return this.#state[accessor]
    }

    validation(){
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        for (const [key, field] of Object.entries(this.#state)) {
            field.validate()
        }
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

interface IFormGroup{
    [key: string]: InputControl
}