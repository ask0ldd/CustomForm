import { useState } from "react"
import { FormGroup } from "../components/FormGroup"

function useFormGroup(initialFormGroup : FormGroup){
    const [formGroup, setFormGroup]= useState(initialFormGroup)

    function setControlValue({controlName, value} : {controlName : string, value : string}){
        const _formGroup = {...formGroup, controls : {...formGroup.controls, [controlName] : value }}
        setFormGroup(_formGroup)
    }

    return {get : () => formGroup, set : setFormGroup}
}

export default useFormGroup