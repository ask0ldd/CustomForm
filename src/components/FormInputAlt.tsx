import { useState } from "react"


export default function FormInputAlt({id, type, placeholder, value, style} : IInputAlt) {
    const [inputValue, setInputValue] = useState(value)
    return (
        <input 
            type={type} id={id} placeholder={placeholder} value={inputValue} style={style}
            onChange={(e) => setInputValue(e.target.value)}
        />
    )
}

interface IInputAlt{
    id : string
    type : "text" | "email" | "password" | "number" | "search" | "tel" | "url"
    placeholder? : string
    value : string
    style? :  React.CSSProperties
}