import { useState } from "react"
import InputControl from "./InputControl"

export default function FormInputAlt({id, type, placeholder, inputControl, value, style} : IInputAlt) {
    const [inputValue, _setInputValue] = useState(value)

    function setInputValue(value : string){
        _setInputValue(value)
        inputControl.setValue(value)
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
    inputControl : InputControl
    placeholder? : string
    value? : string
    style? :  React.CSSProperties
}