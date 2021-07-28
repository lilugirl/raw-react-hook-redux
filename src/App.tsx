import React, { useState } from 'react'
import './App.css'
import Home from './Home'
import {ReduxContext,useConnect,useCreateStore} from './hooks/useRedux'


function App() {
  const store=useCreateStore(function(state:any,action:any){
    const {type,payload}=action
    if(type==='setA'){
      return {
        ...state,
        mesA:payload
      }
    }else if(type==='setB'){
      return {
        ...state,
        mesB:payload
      }
    }else if(type==='clear'){
      return {mesA:'',mesB:''}
    }
  
  },{mesA:'111',mesB:'2222'})

 
 
  return (
    <div className="App">
       <ReduxContext.Provider value={store} >
         <Home/>
       </ReduxContext.Provider>
    </div>
  )
}

export default App
