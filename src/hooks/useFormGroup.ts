import { useState } from "react"
import { ValidatorFn, ValidatorFns } from "../types/validatorsTypes"
import InputControl from "../components/InputControl"

function useFormGroup(){

    /*const initialFormGroup = {
        controls : {},  
        getControls : function () { return this.controls },
        addControl : function (fieldArgs : {accessor : string, defaultValue : string, isRequired : boolean, validationFns : ValidatorFn | ValidatorFns | undefined}) {
            if (fieldArgs == null) return this
            this.controls = {...this.controls,
                [fieldArgs.accessor] : new InputControl(fieldArgs)
            }
            return this
        },
        
    }*/

    const [controls, setControls] = useState({})

    // const [formGroup, setFormGroup]= useState(initialFormGroup)

    function addControl(fieldArgs : {accessor : string, defaultValue : string, isRequired : boolean, validationFns : ValidatorFn | ValidatorFns | undefined}) {
        if(controls[fieldArgs.accessor as keyof typeof controls]) throw new Error("A control with this name already exists.")
        setControls(prevControls => ({...prevControls, [fieldArgs.accessor] : new InputControl(fieldArgs)}))
    }

    function setControlValue({controlName, value} : {controlName : string, value : string}){
        if(!controls[controlName as keyof typeof controls]) throw new Error("No control with that name.")
        const targetControl : InputControl = controls[controlName as keyof typeof controls]
        targetControl.setValue(value)
        setControls(prevControls => ({...prevControls, [controlName] : targetControl}))
    }

    function getControl(controlName : string){
        if(controls[controlName as keyof typeof controls]) return controls[controlName as keyof typeof controls]
        throw new Error("No control with that name.")
    }

    return {getControl, setControlValue, addControl}
}

export default useFormGroup