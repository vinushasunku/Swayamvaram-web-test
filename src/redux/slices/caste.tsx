import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import CasteService, { CasteInfoDto, ReligionDataDto } from '../../services/CasteService'

export const initialState={
    religionStatus:'idle',
    religionError:'',
    casteData:createCaste(),
    religionData:createReligionData(),
    casteList:createCasteList(),
    subCasteList:createSubCasteList(),
    currentRequestId: undefined,
}
export function createCaste(): CasteInfoDto{
    return{
        religion:'',
        caste:'',
        subCaste:''
    };

}
export function createCasteList(): [ReligionDataDto]{
  return[
    {
      id:'',
      name:'',
      hasNextLevel:'',
      nextLevelName:''
  }
  ]

}
export function createSubCasteList(): [ReligionDataDto]{
  return[
    {
      id:'',
      name:'',
      hasNextLevel:'',
      nextLevelName:''
  }
  ]

}
export function createReligionData(): [ReligionDataDto]{
  return[
    {
      id:'',
      name:'',
      hasNextLevel:'',
      nextLevelName:''
    },
  ]

}

export const fetchReligionlists=createAsyncThunk(
  'matrimony/getReligion',
  async () =>{
    const res= await CasteService.getReligion();
    console.log('getreligion',res?.data?.values)
    return res? res?.data?.values :undefined
  }
);
export const fetchCastelists=createAsyncThunk(
  '/matrimony/religion/',
  async (regionName:string) =>{
    const res= await CasteService.getcaste(regionName);
    return res? res?.data?.values :undefined
  }
);
export const fetchSubCastelists=createAsyncThunk(
  '/matrimony/Subreligion/',
  async (religion:CasteInfoDto) =>{
    const res= await CasteService.getSubcaste(religion.religion,religion.caste);
    return res? res?.data?.values :undefined
  }
);
export const casteSlice = createSlice({
    name: "Caste",
    initialState,
    reducers: {
      setCasteData:(state, action: PayloadAction<CasteInfoDto>)=> {
        state.casteData=action.payload        
      },
      resetQuery:()=>{
        return initialState
      },
    },
    extraReducers: builder => {
      builder.addCase(fetchReligionlists.fulfilled, (state, action) => {
        const { requestId } = action.meta
        if (
          state.religionStatus === 'pending' &&
          state.currentRequestId === requestId
        ) {
          state.religionStatus = 'idle'
          state.religionData.push(action.payload)
          state.currentRequestId = undefined
        }
      })
      .addCase(fetchReligionlists.pending, (state, action) => {
        if (state.religionStatus === 'idle') {
            state.religionStatus = 'pending'
            state.religionError='';
          }
      })
      .addCase(fetchReligionlists.rejected, (state, action) => {
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
      .addCase(fetchCastelists.fulfilled, (state, action) => {
        const { requestId } = action.meta
        if (
          state.religionStatus === 'pending' &&
          state.currentRequestId === requestId
        ) {
          state.religionStatus = 'idle'
          state.casteList.push(action.payload)
          state.currentRequestId = undefined
        }
      })
      .addCase(fetchCastelists.pending, (state, action) => {
        if (state.religionStatus === 'idle') {
            state.religionStatus = 'pending'
            state.religionError='';
          }
      })
      .addCase(fetchCastelists.rejected, (state, action) => {
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
      .addCase(fetchSubCastelists.fulfilled, (state, action) => {
        const { requestId } = action.meta
        if (
          state.religionStatus === 'pending' &&
          state.currentRequestId === requestId
        ) {
          state.religionStatus = 'idle'
          state.subCasteList.push(action.payload)
          state.currentRequestId = undefined
        }
      })
      .addCase(fetchSubCastelists.pending, (state, action) => {
        if (state.religionStatus === 'idle') {
            state.religionStatus = 'pending'
            state.religionError='';
          }
      })
      .addCase(fetchSubCastelists.rejected, (state, action) => {
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
  
  export const { setCasteData} = casteSlice.actions
  export  const getCaste=(state:any)=>state.casteData;
  export  const getReligion=(state:any)=>state.religionData;
  export  const getCasteList=(state:any)=>state.casteList;
  export  const getSubCasteList=(state:any)=>state.subCasteList;
  export default casteSlice.reducer