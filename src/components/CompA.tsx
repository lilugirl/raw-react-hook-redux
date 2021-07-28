import React, { useState } from 'react'
import {useConnect} from '../hooks/useRedux'

function CompA() {
    const [value,setValue]=useState('')
    // @ts-ignore
    const [state,dispatch]=useConnect((state:any)=>({mesB:state.mesB}))
    console.log('-------------CompA--------')
    console.log('state',state)
    console.log('dispatch',dispatch);
    
    return (
        <div>
           <p>组件A</p>
           <p>组件B对我说:{state.mesB}</p>
           <input onChange={(e)=>setValue(e.target.value)} placeholder="对B组件说"/>
           <button onClick={()=>dispatch({type:'setA',payload:value})}>确定</button>
        </div>
    )
}

export default CompA
