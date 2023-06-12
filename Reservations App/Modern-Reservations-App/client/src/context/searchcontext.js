import React, {createContext, useReducer} from 'react';


// the useReducer hook manages the state in the context. useReducer hook takes a reducer function and an initial state and returns an array with the current state and dispatch function.

//usereducer has reducer function and initial state

//usereducer then returns an array. 

// reducer function takes the current state and an action object and returns new state



const initialstate ={

    city:undefined,
    date:[],
    options:{

        adult:undefined,
        children:undefined,
        room:undefined
    }

    // initialstate defines the initial state of the context which has 3 properties city, dates and options.

}



export const Searchcontext = createContext(initialstate)
// creating the context

 const searchreducer =(state,action)=>{

    // searchreducer is the reducer function used to update the state based on the dispatched actions.

    switch(action.type){
        case 'newsearch': 
            return action.payload

        //whenever our search bar changes we will send this data, the payload will contain the data

        case 'resetsearch':
            return initialstate

            default:
                return state;
    }
 }


 export const SearchcontextProvider = ({children}) =>{

    //SearchcontextProvider is a provider component that wraps the components that need access to the context

    const [state, dispatch] = useReducer(searchreducer, initialstate)

    // the provider component takes in the state and dispatch values from usereducer and passes them down to the context using the value prop.

    return(
        <Searchcontext.Provider value = {{city:state.city, date:state.date, options:state.options, dispatch}}>
            {children}
        </Searchcontext.Provider>
    )
 }