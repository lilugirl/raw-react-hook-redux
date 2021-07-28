import React, { useState } from 'react'
import CompA from './components/CompA'
import CompB from './components/CompB'
import CompC from './components/CompC'
import CompD from './components/CompD'
import { useCreateStore } from './hooks/useRedux'


function Home() {
  const [isShow,setShow]=React.useState(true)
  console.log('home 渲染')
 
 
  return (
    <div className="App">
      <CompA/>
      <CompB/>
      <CompC/>
      {isShow && <CompD/>}
      <button onClick={()=>setShow(!isShow)}>点击</button>
      <button onClick={()=>{ }}>创建第二个store</button>
    </div>
  )
}

export default Home
