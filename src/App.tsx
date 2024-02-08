import './App.css'
import { FormGroup } from './components/FormGroup'
import FormInput from './components/FormInput'

function App() {

  const formGroup = new FormGroup()
  formGroup.addField({accessor : "name", defaultValue : "", isRequired : false, validationFns : [test]})

  return (
    <form>
      <FormInput input={{id : "name-label", type : 'text'}} label={{id : "name-label", text : 'name'}} formControl={formGroup.get("name")} errorMessage={''}/>
    </form>
  )
}

export default App

function test(){
  return true
}