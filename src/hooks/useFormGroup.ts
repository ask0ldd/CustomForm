import { useState } from "react"
import { ValidatorFn, ValidatorFns } from "../types/validatorsTypes"
import InputControl from "../components/InputControl"

function useFormGroup(){

    const [controls, setControls] = useState<IFormGroup>({})

    // replace accessor with controlName?
    function addControl(fieldArgs : {accessor : string, defaultValue : string, isRequired : boolean, validationFns : ValidatorFn | ValidatorFns | undefined}) {
        if(controls[fieldArgs.accessor]) throw new Error("A control with this name already exists.")
        setControls(prevControls => ({...prevControls, [fieldArgs.accessor] : new InputControl(fieldArgs)}))
    }

    function setControlValue({controlName, value} : {controlName : string, value : string}){
        if(!controls[controlName]) throw new Error("No control with that name.")
        const targetControl : InputControl = controls[controlName]
        targetControl.setValue(value)
        setControls(prevControls => ({...prevControls, [controlName] : targetControl}))
    }

    function getControl(controlName : string) : InputControl{
        if(controls[controlName]) return controls[controlName]
        throw new Error("No control with that name.")
    }

    function validateAllControls(){
        const newControls = {...controls}
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        for (const [_, control] of Object.entries(newControls)) {
            control.validate()
        }
        setControls(newControls)
    }

    /*
        const clone = Object.assign( {}, instanceOfBlah );
        Object.setPrototypeOf( clone, Blah.prototype );
    */

    return {getControl, setControlValue, addControl, validateAllControls}
}

export default useFormGroup

interface IFormGroup{
    [key: string]: InputControl
}