import { useState } from "react"
import { FormGroup } from "../components/FormGroup"

function useFormGroup(initialFormGroup : FormGroup){
    const [_formGroup, setFormGroup]= useState(initialFormGroup)
    return {get : () => _formGroup, set : setFormGroup}
}

export default useFormGroup