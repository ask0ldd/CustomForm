import './App.css'
import { FormGroup } from './components/FormGroup'
import FormInput from './components/FormInput'
import FormInputAlt from './components/FormInputAlt'

function App() {

  const formGroup = new FormGroup()
  formGroup.addField({accessor : "name", defaultValue : "", isRequired : false, validationFns : [lengthSupTen, lengthInfFifty]}) // define error messages here
  formGroup.addField({accessor : "lastname", defaultValue : "", isRequired : false, validationFns : [lengthSupTen, lengthInfFifty]})

  return (
    <form style={{display:'flex', flexDirection:'column', rowGap:'1rem', width:'800px'}} onSubmit={(e : React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      formGroup.validation()
    }}>
      <FormInput 
          input={{id : "name", type : 'text', value : ''}} 
          label={{id : "name-label", text : 'name'}} 
          inputControl={formGroup.get("name")} 
          errorMessages={{lengthSupTen : 'error', lengthInfFifty : 'error2'}}
      />
      <FormInputAlt id="lastname" type={'text'} value={''} inputControl={formGroup.get('lastname')}/>
      <input type='submit'/>
    </form>
  )
}

export default App

function lengthSupTen(value : string) : boolean{
  return value.length > 10
}

function lengthInfFifty(value : string) : boolean{
  return value.length < 50
}