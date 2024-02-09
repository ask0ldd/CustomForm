import { useMemo, /*useState*/ } from 'react'
import './App.css'
import { FormGroup } from './components/FormGroup'
import FormInput from './components/FormInput'
import FormInputAlt from './components/FormInputAlt'
// import useFormGroup from './hooks/useFormGroup'

function App() {

  const formGroup = useMemo(() =>  new FormGroup()
    .addInputControl({accessor : "name", defaultValue : "", isRequired : false, validationFns : [lengthSupTen, lengthInfFifty]})
    .addInputControl({accessor : "lastname", defaultValue : "", isRequired : false, validationFns : [lengthSupTen, lengthInfFifty]})
    .build(), []
  )

  // const formGroup = useFormGroup(initialFormGroup)

  // const [_formGroup, setFormGroup] = useState<FormGroup>(initialFormGroup)

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
      {formGroup.get('lastname').errors.includes('lengthSupTen') && <p id="lengthSupTenMessage">Should be at least 10 characters long.</p>}
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