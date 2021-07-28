import React from 'react'
import { useConnect } from '../hooks/useRedux'

function CompD() {
    const [,dispatch]=useConnect()
    console.log('D 组件更新')
    return (
        <div>
           <button onClick={()=>dispatch({type:'clear'})}>清空</button>
        </div>
    )
}

export default CompD
