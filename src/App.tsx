import './App.css'
import { FormGroup } from './components/FormGroup'
import FormInput from './components/FormInput'

function App() {

  const formGroup = new FormGroup()
  formGroup.addField({accessor : "name", defaultValue : "", isRequired : false, validationFns : [lengthSupTen, lengthInfFifty]}) // define error messages here

  return (
    <form onSubmit={(e : React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      formGroup.validation()
    }}>
      <FormInput input={{id : "name", type : 'text', value : ''}} label={{id : "name-label", text : 'name'}} inputControl={formGroup.get("name")} errorMessages={{lengthSupTen : 'error', lengthInfFifty : 'error2'}}/>
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