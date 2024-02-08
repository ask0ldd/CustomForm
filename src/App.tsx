import './App.css'
import { FormGroup } from './components/FormGroup'
import FormInput from './components/FormInput'

function App() {

  const formGroup = new FormGroup()
  formGroup.addField({accessor : "name", defaultValue : "", isRequired : false, validationFns : [test]})

  return (
    <form onSubmit={(e : React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      formGroup.validation()
    }}>
      <FormInput input={{id : "name-label", type : 'text'}} label={{id : "name-label", text : 'name'}} inputControl={formGroup.get("name")} errorMessage={'error'}/>
      <input type='submit'/>
    </form>
  )
}

export default App

function test(value : string) : boolean{
  return value.length > 10
}