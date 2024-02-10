import { useState } from "react";

export default function useTest(){
    const [state, setState] = useState<{[key : string] : string}>({})

    function addState(key : string, value : string){
        setState(prevState => ({...prevState, [key] : value}))
    }

    return {addState, state}
}