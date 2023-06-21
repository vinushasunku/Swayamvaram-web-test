import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RegistrationDto } from '../../services/RegistrationService'

export const initialState={
    registrationData:createRegistration(),
    accountId:'',
}
export function createRegistration(): RegistrationDto{
    return{
      emailAddress:'',
      countryCode:0,
      mobileNumber:0,
      firstName:'',
      lastName:'',
      gender:'',
      creator:'',
      password:''

    };

}
export const registrationSlice = createSlice({
    name: "registration",
    initialState,
    reducers: {
      setRegistration:(state, action: PayloadAction<any>)=> {
        state.registrationData=action.payload
        
      },
      setAccountId(state, action: PayloadAction<any>) {
        console.log('accountidnumber', action.payload)
        state.accountId = action.payload
      },
      resetQuery:()=>{
        return initialState
      }
    }
  })
  
  export const { setRegistration,setAccountId} = registrationSlice.actions
  export  const getRegistration=(state:any)=>state.registrationData;

  export default registrationSlice.reducer