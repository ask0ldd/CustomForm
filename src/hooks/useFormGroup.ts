import { useEffect, useState } from "react"
import { ValidatorFn, ValidatorFns } from "../types/validatorsTypes"
import InputControl from "../components/InputControl"

function useFormGroup(){

    const [controls, setControls] = useState<IControlsGroup>({})

    useEffect(() => {
        console.log(controls)
      }, [controls]
    )

    // replace accessor with controlName?
    function addControl(fieldArgs : IControlBuilderArgs) {
        if(controls[fieldArgs.accessor]) throw new Error("A control with this name already exists.")
        setControls(oldControls => ({...oldControls, [fieldArgs.accessor] : new InputControl(fieldArgs)}))
    }

    function setControlValue({controlName, value} : {controlName : string, value : string}){
        // if(!controls[controlName]) throw new Error("No control with that name.")
        const targetControl : InputControl = controls[controlName]
        targetControl.setValue(value)
        setControls(prevControls => ({...prevControls, [controlName] : targetControl}))
    }

    function getControl(controlName : string) : InputControl{
        if(controls[controlName]) return controls[controlName]
        throw new Error("No control with that name.")
    }

    function getControlValue(controlName : string) : string{
        if(controls[controlName]) return controls[controlName].getValue()
        throw new Error("No control with that name.")
    }

    function hasControl(controlName : string) : boolean{
        if(controls[controlName]) return true
        return false
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

    return {getControl, hasControl, getControlValue, setControlValue, addControl, validateAllControls}
}

export default useFormGroup

interface IControlsGroup{
    [key: string]: InputControl
}

export interface IFormGroup{
    getControl : (controlName : string) => InputControl,
    hasControl : (controlName : string) => boolean, 
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