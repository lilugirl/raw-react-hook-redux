import React from 'react'
import { useConnect } from '../hooks/useRedux'

function CompC() {
    //@ts-ignore
    const [state,dispatch]=useConnect((state:any)=>({mes1:state.mesA,mes2:state.mesB}))
    console.log('CompC')
    console.log('state',state)
    console.log('dispatch',dispatch);
    
    return (
        <div className="compnent_box">
            <p>组件A：{state.mes1}</p>
            <p>组件B: {state.mes2}</p>
        </div>
    )
}

export default CompC
