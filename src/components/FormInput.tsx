import FormControl from "./InputControl"

export default function FormInput({input, label, formControl, errorMessage} : IProps) {

  const labelId = label.id

  return (
    <>
      {label.text && <label id={labelId} htmlFor={input.id} className={label?.CSSClasses?.join(' ')}>{label.text}</label>}
      <input aria-labelledby={labelId} type={input.type} id={input.id} placeholder={input?.placeholder} className={input?.CSSClasses?.join(' ')} value={formControl.value}
      onChange={(e) => formControl.value = e.target.value}/>
      {(formControl.errors.length > 0) && <p className="errorMessage" id={input.id+"-error"}>{errorMessage}</p>}
    </>
  )
}

interface IProps{
  input : IInput
  label : ILabel
  formControl : FormControl
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

export interface IFormGroup{
  [key: string]: IField
}

interface IField{
  accessor : string
  defaultValue : string
  validationFns : ((value: string) => boolean)[]
  isMandatory : boolean
  error : boolean
  value : string
}