import { ValidatorFn, ValidatorFns } from "../types/validatorsTypes"
import InputControl from "./InputControl"

/**
 * Represents a form group.
 */
export class FormGroup {

    controls : IFormGroup = {}

    /**
     * Constructs a new FormGroup.
     */
    constructor(){
        this.controls = {}
        return this
    }

    getControls(){
        return {...this.controls}
    }

    /*addField(fieldArgs : {accessor : string, defaultValue : string, isRequired : boolean, validationFns : ValidatorFn | ValidatorFns | undefined}){
        if (fieldArgs == null) return this
        this.#state = {...this.#state,
            [fieldArgs.accessor] : new InputControl(fieldArgs)
        }
    }*/

    addControl(fieldArgs : {accessor : string, defaultValue : string, isRequired : boolean, validationFns : ValidatorFn | ValidatorFns | undefined}){
        if (fieldArgs == null) return this
        this.controls = {...this.controls,
            [fieldArgs.accessor] : new InputControl(fieldArgs)
        }
        return this
    }

    get(accessor : string) : InputControl{
        return this.controls[accessor]
    }

    validation(){
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        for (const [key, field] of Object.entries(this.controls)) {
            field.validate()
        }
    }

    /**
     * Build the FormGroup.
     * @returns {Object} FormGroup.
     */
    build() {
        // if (Object.keys(this.#state).length === 0) throw new Error("No valid Field defined.")
        return this
    }
}

interface IFormGroup{
    [key: string]: InputControl
}