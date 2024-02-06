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

  
  /**
   * Format the value of an Input
   * @param {string} value - The input value.
   * @return {string} - The formatted input.
   */
  function formatInputValue(value : string): string{
    return value.trim().toLowerCase()
  }

  /**
   * Update the target formGroupState field.
   * @param {string} fieldAccessor - The key giving access to one specific formGroupState field.
   * @param {IFormGroup} formGroupState - The current state of the form. Grouping : value, error, validationFn & isMandatory for each form field.
   * @param {string} value - The new value for the field.
   * @returns {IFormGroup} - The updated form state.
   */
  function updateFormGroupField(fieldAccessor : string, formGroupState : IFormGroup, value : string){
      return {...formGroupState, [fieldAccessor] : {
          ...formGroupState[fieldAccessor],
          value : formatInputValue(value), 
          error : !formGroupState[fieldAccessor].validationFn(value),
          validationFn : formGroupState[fieldAccessor].validationFns,
          isMandatory : formGroupState[fieldAccessor].isMandatory
      }}
  }
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