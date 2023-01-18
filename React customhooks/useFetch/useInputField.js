import React, { useState, useEffect } from 'react'


export default function useInputField(defaultValue = '', specialCharsAllow=true) {
    const [value, setValue] = useState(defaultValue)

    const handleInputValue = (e) => {
        if (e) {
            let val = e.target.value
            if(!specialCharsAllow){
                val =  val.replace(/[^\w\s]/gi, "") 
            }
            setValue(e.target.value)
        }
    }

    return [value, setValue, handleInputValue]
}
