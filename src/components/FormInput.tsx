

export default function FormInput({input, label, formGroupState, errorMessage} : IProps) {
  return (
    <div>
        <label></label>
        <input></input>
    </div>
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
  validationFn : (value: string) => boolean
  isMandatory : boolean
  error : boolean
  value : string
}