import { useState } from "react"
import { ValidatorFn, ValidatorFns } from "../types/validatorsTypes"
import InputControl from "../components/InputControl"

function useFormGroup(){

    const [controls, setControls] = useState<IControlsGroup>({})

    // replace accessor with controlName?
    function addControl(fieldArgs : IControlBuilderArgs) {
        if(controls[fieldArgs.accessor]) throw new Error("A control with this name already exists.")
        setControls(prevControls => ({...prevControls, [fieldArgs.accessor] : new InputControl(fieldArgs)}))
        console.log(controls)
    }

    function setControlValue({controlName, value} : {controlName : string, value : string}){
        if(!controls[controlName]) throw new Error("No control with that name.")
        const targetControl : InputControl = controls[controlName]
        targetControl.setValue(value)
        setControls(prevControls => ({...prevControls, [controlName] : targetControl}))
    }

    function getControl(controlName : string) : InputControl{
        console.log(controls)
        if(controls[controlName]) return controls[controlName]
        throw new Error("No control with that name.")
    }

    function getControlValue(controlName : string) : string{
        console.log(controls)
        if(controls[controlName]) return controls[controlName].getValue()
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

    return {getControl, getControlValue, setControlValue, addControl, validateAllControls}
}

export default useFormGroup

interface IControlsGroup{
    [key: string]: InputControl
}

export interface IFormGroup{
    getControl : (controlName : string) => InputControl, 
    getControlValue : (controlName : string) => string, 
    setControlValue : ({controlName, value} : {controlName : string, value : string}) => void, 
    addControl : (fieldArgs : IControlBuilderArgs) => void, 
    validateAllControls : () => void
}

interface IControlBuilderArgs{
    accessor : string, 
    defaultValue : string, 
    isRequired : boolean, 
    validationFns : ValidatorFn | ValidatorFns | undefined
}