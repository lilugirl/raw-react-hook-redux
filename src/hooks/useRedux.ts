import React from "react";
import { unstable_batchedUpdates } from "react-dom"

export const ReduxContext=React.createContext(null)

// 用于产生reduxHooks的store
export function useCreateStore(reducer:any,initState:any){
    console.log('reducer',reducer)
    console.log('initState',initState)
    const store:any=React.useRef(null)
    console.log('store',JSON.stringify(store))
    console.log('store',store)

    if(!store.current){
        console.log('store第一次')
        store.current=new ReduxHooksStore(reducer,initState).exportStore()
    }else{
        console.log('sotre已经有了')
    }

    return store.current
}

export function useConnect(mapStoreToState=()=>{}){
    console.log('useConnect begin')
    console.log('mapStoreToState',mapStoreToState)
    console.log('ReduxContext',ReduxContext)
    // 获取Store内部的重要函数
    const contextValue:any=React.useContext(ReduxContext)
    console.log('contexValue',contextValue)
    const {getInitState,subscribe,unSubscribe,dispatch}=contextValue

    // 用于传递给业务组件的state
    const stateValue=React.useRef(getInitState(mapStoreToState))
    console.log('stateValue',stateValue)

    // 渲染函数
    const [,forceUpdate]=React.useState()
    // 产生
    const connectValue=React.useMemo(()=>{
        const state={
            // 用于比较一次 dipatch中，新的state和之前的state是否发生变化
            cacheState:stateValue.current,
            //更新函数
            update:function(newState:any){
                console.log('update new Satte',newState);
                // 获取订阅的state
                // @ts-ignore
                const selectState=mapStoreToState(newState)
                console.log('selectState',selectState)

                // 浅比较 state是否发生变化，如果发生变化 
                const isEqual=shallowEqual(state.cacheState,selectState)
                state.cacheState=selectState
                stateValue.current=selectState
                if(!isEqual){
                    //更新
                    console.log('foreUpdate');
                    //@ts-ignore
                   
                     forceUpdate({})
                }
            }
        }

        console.log('state',state)

        return state

    },[contextValue]) // 将contextValue作为依赖

    React.useEffect(()=>{
        // 组件挂载-注册 connect
        const name=subscribe(connectValue)
        console.log('name',name)
        return function(){
            // 组件卸载 解绑
            unSubscribe(name)
        }
    },[connectValue]) // 将connectValue作为useEffect的依赖

    return [stateValue.current,dispatch]
}


class ReduxHooksStore{
    mapConnects: any
    state: any
    reducer: any
    id: number
    name: string
    constructor(reducer:any,initState:any){
        console.log('实例化ReduxHookStore',this)
        this.name='__ReduxHooksStore__'
        this.id=0
        this.reducer=reducer
        this.state=initState
        this.mapConnects={}
        console.log('this.mapConnects',JSON.stringify(this.mapConnects))
    }

    // 需要对外传递的接口
    exportStore=()=>{
       return {
           dispatch:this.dispatch.bind(this),
           subscribe:this.subscribe.bind(this),
           unSubscribe:this.unSubscribe.bind(this),
           getInitState:this.getInitState.bind(this)
       }
    }

    // 获取初始化 state
    getInitState=(mapStoreToState:any)=>{
        console.log('getInitState mapStoreToState',mapStoreToState)
        console.log('this.state',JSON.stringify(this.state))
       return mapStoreToState(this.state)
    }

    // 更新需要更新的组件
    publicRender=()=>{
        console.log('-----------------------this.publicRender')
        unstable_batchedUpdates(()=>{ // 批量更新
            console.log('批量更新');

            Object.keys(this.mapConnects).forEach((name)=>{
                const {update}=this.mapConnects[name]
                console.log('this.satet',this.state)
                update(this.state)
            })
        })
    }

    // 更新state
    dispatch=(action:any)=>{
        console.log('this.dispatch action',this.dispatch,action)
        console.log('this.reducer',this.reducer)
        this.state=this.reducer(this.state,action)

        //批量更新
        this.publicRender()
    }

    // 注册每一个connect
    subscribe=(connectCurrent:any)=>{
        const connectName=this.name+(++this.id)
        console.log('connectName',connectName);
        console.log('this.mapConnects',this.mapConnects)
        this.mapConnects[connectName]=connectCurrent
        return connectName
    }

    // 解除绑定
    unSubscribe=(connectName:any)=>{
        delete this.mapConnects[connectName]
    }
}

const hasOwn = Object.prototype.hasOwnProperty

export default function shallowEqual(a:any, b:any) {
    console.log('---------------------shallow equal ',a,b)
  if (a === b) return true

  let countA = 0
  let countB = 0
  
  for (let key in a) {
    if (hasOwn.call(a, key) && a[key] !== b[key]) return false
    countA++ // 这里是不是应该检查ownProperty以后，再增加？
  }

  for (let key in b) {
    if (hasOwn.call(b, key)) countB++
  }

  return countA === countB
}
