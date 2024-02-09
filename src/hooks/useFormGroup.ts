import { useState } from "react"
import InputControl from "../components/InputControl"
import { ValidatorFn, ValidatorFns } from "../types/validatorsTypes"

function useFormGroup(){

    const initialFormGroup = {
        controls : {},  
        getControls : function () { return this.controls },
        addControl : function (fieldArgs : {accessor : string, defaultValue : string, isRequired : boolean, validationFns : ValidatorFn | ValidatorFns | undefined}) {
            if (fieldArgs == null) return this
            this.controls = {...this.controls,
                [fieldArgs.accessor] : new InputControl(fieldArgs)
            }
            return this
        },
        
    }

    const [formGroup, setFormGroup]= useState(initialFormGroup)


    function setControlValue({controlName, value} : {controlName : string, value : string}){
        const _formGroup = {...formGroup, controls : {...formGroup.controls, [controlName] : value }}
        setFormGroup(_formGroup)
    }

    return {get : () => formGroup, set : setFormGroup}
}

export default useFormGroup