import { useState } from "react"
// import InputControl from "./InputControl"
import { IFormGroup } from "../hooks/useFormGroup"

export default function FormInputAlt({id, type, placeholder, formGroup, value, style} : IInputAlt) {
    const [inputValue, _setInputValue] = useState(value)

    function setInputValue(value : string){
        _setInputValue(value)
        formGroup.setControlValue({controlName : id, value : value})
    }

    function handleChange(e : React.ChangeEvent<HTMLInputElement>){
        setInputValue(e.target.value)
    }

    return (
        <input 
            type={type} id={id} placeholder={placeholder} value={inputValue} style={style}
            onChange={handleChange}
        />
    )
}

interface IInputAlt{
    id : string
    type : React.HTMLInputTypeAttribute
    formGroup : IFormGroup
    placeholder? : string
    value? : string
    style? :  React.CSSProperties
}