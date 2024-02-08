import { useState } from "react"
import InputControl from "./InputControl"

export default function FormInput({input, label, inputControl, errorMessage} : IProps) {

  const [inputValue, setInputValue] = useState(input.value)

  return (
    <>
      {label.text && <label id={label.id} htmlFor={input.id} className={label?.CSSClasses?.join(' ')}>{label.text}</label>}
      <input aria-labelledby={label.id} type={input.type} id={input.id} placeholder={input?.placeholder} className={input?.CSSClasses?.join(' ')} value={inputValue}
      onChange={(e) => {
        setInputValue(e.target.value)
        inputControl.value = e.target.value
      }}/>
      {(inputControl.errors.length > 0) && <p className="errorMessage" id={input.id+"-error"}>{errorMessage}</p>}
    </>
  )
}

interface IProps{
  input : IInput
  label : ILabel
  inputControl : InputControl
  errorMessage : string
}

interface ILabel{
  id? : string
  text : string
  CSSClasses? : string[]
}

interface IInput{
  id : string
  type : "text" | "email" | "password" | "number" | "search" | "tel" | "url"
  placeholder? : string
  value? : string
  CSSClasses? : string[]
}