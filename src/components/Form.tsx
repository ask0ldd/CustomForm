/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import useFormGroup from '../hooks/useFormGroup'
import FormInputAlt from './FormInputAlt'

export default function Form() {

    const formGroup = useFormGroup()
    useEffect(() => {
        formGroup.addControl({accessor : "name", defaultValue : "", isRequired : false, validationFns : [lengthSupTen, lengthInfFifty]})
        formGroup.addControl({accessor : "lastname", defaultValue : "", isRequired : false, validationFns : [lengthSupTen, lengthInfFifty]})
    }, [])
    
    return (
        <form style={{display:'flex', flexDirection:'column', rowGap:'1rem', width:'800px'}} onSubmit={(e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        formGroup.validateAllControls()
        }}>
        <FormInputAlt id="lastname" type={'text'} value={''} formGroup={formGroup}/>
        {/*formGroup.get('lastname').errors.includes('lengthSupTen') && <p id="lengthSupTenMessage">Should be at least 10 characters long.</p>*/}
        {formGroup.hasControl('lastname') && <p>Should at least : {formGroup.getControlValue('lastname')}</p>}
        <input type='submit'/>
        </form>
    )
}

function lengthSupTen(value : string) : boolean{
    return value.length > 10
}
  
function lengthInfFifty(value : string) : boolean{
    return value.length < 50
}
