export default function FormInput({input, label, formGroupState, errorMessage} : IProps) {

  const labelId = label.id
  const fieldAccessor = formGroupState.fieldAccessor

  if(fieldAccessor == null) return (<></>)

  return (
    <>
      {label.text && <label id={labelId} htmlFor={input.id} className={label?.CSSClasses?.join(' ')}>{label.text}</label>}
      <input aria-labelledby={labelId} type={input.type} id={input.id} placeholder={input?.placeholder} className={input?.CSSClasses?.join(' ')} value={/*input?.value || */formGroupState.get()[fieldAccessor].value}
      onChange={(e) => formGroupState.set(updateFormGroupField(fieldAccessor, formGroupState.get(), e.target.value))}/>
      {(formGroupState.get()[fieldAccessor]?.error && errorMessage) && <p className="errorMessage" id={input.id+"-error"}>{errorMessage}</p>}
    </>
  )
}

interface IProps{
  input : IInput
  label : ILabel
  formGroupState : { 
      get() : IFormGroup
      set : (state : IFormGroup) => void
      fieldAccessor? : string
  }
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