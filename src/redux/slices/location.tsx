import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import CasteService, { CasteInfoDto, ReligionDataDto } from '../../services/CasteService'
import LocationService, { LocationDataDto, LocationInfoDto } from '../../services/LocationService';

export const initialState={
    religionStatus:'idle',
    religionError:'',
    locationData:createLocation(),
    countryData:createCountryData(),
    stateList:createStateList(),
    cityList:createCityList(),
    currentRequestId: undefined,
}
export function createLocation(): LocationInfoDto{
    return{
    country:'',
    state:'',
    city:'',
    citizenship:'',
    visaStatus:'',
    visaExpiryMonth:0,
    visaExpiryYear:0,
    };

}
export function createStateList(): [LocationDataDto]{
  return[
    {
      id:'',
      name:'',
      hasNextLevel:'',
      nextLevelName:''
  }
  ]

}
export function createCityList(): [LocationDataDto]{
  return[
    {
      id:'',
      name:'',
      hasNextLevel:'',
      nextLevelName:''
  }
  ]

}
export function createCountryData(): [LocationDataDto]{
  return[
    {
      id:'',
      name:'',
      hasNextLevel:'',
      nextLevelName:''
    },
  ]

}

export const fetchCountrylists=createAsyncThunk(
  '/matrimony/getlocation',
  async () =>{
    const res= await LocationService.getCountries();
    return res? res?.data?.values :undefined
  }
);
export const fetchStatelists=createAsyncThunk(
  '/matrimony/state/',
  async (countryName:string) =>{
    const res= await LocationService.getStates(countryName);
    return res? res?.data?.values :undefined
  }
);
export const fetchCitylists=createAsyncThunk(
  '/matrimony/city/',
  async (location:LocationInfoDto) =>{
    const res= await LocationService.getCities(location.country,location.state);
    return res? res?.data?.values :undefined
  }
);
export const locationSlice = createSlice({
    name: "Caste",
    initialState,
    reducers: {
      resetQuery:()=>{
        return initialState
      },
    },
    extraReducers: builder => {
      builder.addCase(fetchCountrylists.fulfilled, (state, action) => {
        const { requestId } = action.meta
        if (
          state.religionStatus === 'pending' &&
          state.currentRequestId === requestId
        ) {
          state.religionStatus = 'idle'
          state.countryData.push(action.payload)
          state.currentRequestId = undefined
        }
      })
      .addCase(fetchCountrylists.pending, (state, action) => {
        if (state.religionStatus === 'idle') {
            state.religionStatus = 'pending'
            state.religionError='';
          }
      })
      .addCase(fetchCountrylists.rejected, (state, action) => {
        const { requestId } = action.meta
        if (
          state.religionStatus === 'pending' &&
          state.currentRequestId === requestId
        ) {
          state.religionStatus = 'idle'
          state.religionError = "Unable to retrive data"
          state.currentRequestId = undefined
        }
      })
      .addCase(fetchStatelists.fulfilled, (state, action) => {
        const { requestId } = action.meta
        if (
          state.religionStatus === 'pending' &&
          state.currentRequestId === requestId
        ) {
          state.religionStatus = 'idle'
          state.stateList.push(action.payload)
          state.currentRequestId = undefined
        }
      })
      .addCase(fetchStatelists.pending, (state, action) => {
        if (state.religionStatus === 'idle') {
            state.religionStatus = 'pending'
            state.religionError='';
          }
      })
      .addCase(fetchStatelists.rejected, (state, action) => {
        const { requestId } = action.meta
        if (
          state.religionStatus === 'pending' &&
          state.currentRequestId === requestId
        ) {
          state.religionStatus = 'idle'
          state.religionError = "Unable to retrive data"
          state.currentRequestId = undefined
        }
      })
      .addCase(fetchCitylists.fulfilled, (state, action) => {
        const { requestId } = action.meta
        if (
          state.religionStatus === 'pending' &&
          state.currentRequestId === requestId
        ) {
          state.religionStatus = 'idle'
          state.cityList.push(action.payload)
          state.currentRequestId = undefined
        }
      })
      .addCase(fetchCitylists.pending, (state, action) => {
        if (state.religionStatus === 'idle') {
            state.religionStatus = 'pending'
            state.religionError='';
          }
      })
      .addCase(fetchCitylists.rejected, (state, action) => {
        const { requestId } = action.meta
        if (
          state.religionStatus === 'pending' &&
          state.currentRequestId === requestId
        ) {
          state.religionStatus = 'idle'
          state.religionError = "Unable to retrive data"
          state.currentRequestId = undefined
        }
      })
    }
  
  })
  
  export const { } = locationSlice.actions
  export  const getLocation=(state:any)=>state.locationData;
  export  const getCountry=(state:any)=>state.countryData;
  export  const getStateList=(state:any)=>state.stateList;
  export  const getCityList=(state:any)=>state.cityList;
  export default locationSlice.reducer