import React, { useState } from 'react'
import { useConnect } from '../hooks/useRedux'

function CompB() {
    const [value,setValue]=useState('')
    // @ts-ignore
    const [state,dispatch]=useConnect((state)=>({mesA:state.mesA}))
    console.log('CompB')
    console.log('state',state)
    console.log('dispatch',dispatch);
    
    return (
        <div>
            <p>组件B</p>
            <p>组件A对我说 {state.mesA}</p>
            <input onChange={(e)=>setValue(e.target.value)} placeholder="对A组件说" />
            <button onClick={()=>dispatch({type:'setB',payload:value})}>确定</button>
        </div>
    )
}

export default CompB
