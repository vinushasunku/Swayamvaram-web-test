import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { profileDto } from '../../services/LoginService';
import MatchesService,{ MatchesInfoDto, MatchesPageInfoDto, MatchesStatusInfoDto, PrefrenceDataDto, ProfileSelectedDto, SelectedStatus } from '../../services/MatchesService';
import { createCaste } from './caste';
import { createEducation, createProfessional } from './education';
import { createFamily } from './family';
import { createLocation } from './location';
import { createPersonal } from './personal';
import { createProfilePhotoDetail } from './photoDetailLink';

export const initialState={
    matchesData:createMatches(),
    matchesProfileListByStatus:createMatches(),
    matchesShortlistedProfile:createMatches(),
    matchingShortlistedLoading:'idle',
    matchingShortlistedError:'',
    matchingStatusListLoading:'idle',
    matchingStatusListError:'',
    matchesStatus: 'idle',
    matchesError: '',
    matchingStatusLoading:'idle',
    matchingStatusError:'',
    profileDetailStatus: 'idle',
    profileDetailError: '',
    selectedProfileId:selectedprofileInfo(),
    matchesPageInfo:matchesPageInfo(),
    profileDetail:createDetailProfile(),
    matchingStatus:createMatchingStatus(),
    selectedStatus:selectedStatus(),
    preferenceShow:false,
    currentRequestId: undefined,
}
export function createMatches(): [MatchesInfoDto]{
    return[{
      accountId:'',
      firstName:'',
      middleName:'',
      lastName:'',
      age:'',
      profilePhotoLink:''
  }];

}
export function matchesPageInfo(): MatchesPageInfoDto{
  return{
      accountId:'',
      pageToke:1
  };

}
export function selectedprofileInfo(): ProfileSelectedDto{
  return{
      accountId:'',
      selectedProfileId:''
  };

}
export function selectedStatus(): SelectedStatus{
  return{
      accountId:'',
      status:''
  };

}
export function createDetailProfile(): profileDto{
  return{
     id:'',
     password:'',
     personalDetails:createPersonal(),
    familyDetails:createFamily(),
     religionDetails:createCaste(),
    locationDetails:createLocation(),
    professionDetails:createProfessional(),
    educationDetails:createEducation(),
    photoDetails:createProfilePhotoDetail(),
     photoLinks:[]

  };

}
export function createMatchingStatus(): MatchesStatusInfoDto{
  return{
      profile1Id:'',
      profile2Id:'',
      status:'',
      statusReason:{
        requestSentByProfileId:'',
        acceptedByProfileId:'',
        rejectedByProfileId:[],
        viewedByProfileIds:[]        
      }
  };

}
export const fetchMatcheslists=createAsyncThunk(
  '/matrimony/matching/',
  async (info:MatchesPageInfoDto) =>{
    const res= await MatchesService.getMatchesList(info.accountId, info.pageToke);
    return res? res?.data?.matchingProfiles :undefined
  }
);
export const fetchMatchesProfilelistsByStatus=createAsyncThunk(
  '/matrimony/matchingProfileByStatus/',
  async (info:SelectedStatus) =>{
    const res= await MatchesService.getMatchingProfileByStatus(info.accountId, info.status);
    return res? res?.data?.matchingProfiles :undefined
  }
);
export const fetchShortlistedProfile=createAsyncThunk(
  '/matrimony/matchingShorlistedProfile/',
  async (accountId:any) =>{
    const res= await MatchesService.getShortlistedProfile(accountId);
    return res? res?.data?.matchingProfiles :undefined
  }
);
export const fetchProfiledetail=createAsyncThunk(
  '/matrimony/profilDetail/',
  async (info:ProfileSelectedDto) =>{
    const res= await MatchesService.getProfileDetail(info.accountId, info.selectedProfileId);
    console.log('test select profile', res?.data)
    return res? res?.data :undefined
  }
);
export const fetchMatchingStatus=createAsyncThunk(
  '/matrimony/matchingStatus/',
  async (info:ProfileSelectedDto) =>{
    const res= await MatchesService.getMatchingStatus(info.accountId, info.selectedProfileId);
    return res? res?.data :undefined
  }
);
export const fetchSavePreference=createAsyncThunk(
  '/matrimony/matching/',
  async (info:PrefrenceDataDto, acccountid:any) =>{
    const res= await MatchesService.savePreference(info, acccountid);
    return res? res?.data?.matchingProfiles :undefined
  }
);
export const matcheSlice = createSlice({
    name: "Matches",
    initialState,
    reducers: {
      setMatches:(state, action: PayloadAction<any>)=> {
        state.matchesData.push(action.payload)      
      },
      setPreferenceVisiable:(state, action: PayloadAction<any>)=> {
        state.preferenceShow=action.payload    
      },
      // setselectedProfileId(state, action: PayloadAction<any>) {
      //   state.selectedProfileId = action.payload
      // },
      setselectedProfileId:(state, action: PayloadAction<any>)=> {
        state.selectedProfileId=action.payload
        
      },
      resetQuery:()=>{
        return initialState
      }
    },
    extraReducers: builder => {
      builder.addCase(fetchMatcheslists.fulfilled, (state, action) => {
        const { requestId } = action.meta
        console.log(state.matchesStatus, requestId, state.currentRequestId)
        if (
          state.matchesStatus === 'pending' 
        ) {
          state.matchesStatus = 'idle'
          state.matchesData.push(action.payload)
          state.currentRequestId = undefined
        }
      })
      .addCase(fetchMatcheslists.pending, (state, action) => {
          if (state.matchesStatus === 'idle') {
            state.matchesStatus = 'pending'
            state.matchesError='';
          }
      })
      .addCase(fetchMatcheslists.rejected, (state, action) => {
        const { requestId } = action.meta
        if (
          state.matchesStatus === 'pending' 
        ) {
          state.matchesStatus = 'idle'
          state.matchesError = "Unable to retrive data"
          state.currentRequestId = undefined
        }
      })
      .addCase(fetchMatchesProfilelistsByStatus.fulfilled, (state, action) => {
        const { requestId } = action.meta
        if (
          state.matchingStatusListLoading === 'pending' &&
          state.currentRequestId === requestId
        ) {
          state.matchingStatusListLoading = 'idle'
          state.matchesProfileListByStatus.push(action.payload)
          state.currentRequestId = undefined
        }
      })
      .addCase(fetchMatchesProfilelistsByStatus.pending, (state, action) => {
          if (state.matchingStatusListLoading === 'idle') {
            state.matchingStatusListLoading = 'pending'
            state.matchingStatusListError='';
          }
      })
      .addCase(fetchMatchesProfilelistsByStatus.rejected, (state, action) => {
        const { requestId } = action.meta
        if (
          state.matchingStatusListLoading === 'pending' 
        ) {
          state.matchingStatusListLoading = 'idle'
          state.matchingStatusListError = "Unable to retrive data"
          state.currentRequestId = undefined
        }
      })
      .addCase(fetchShortlistedProfile.fulfilled, (state, action) => {
        const { requestId } = action.meta
        if (
          state.matchingStatusListLoading === 'pending' 
        ) {
          state.matchingStatusListLoading = 'idle'
          state.matchesShortlistedProfile.push(action.payload)
          state.currentRequestId = undefined
        }
      })
      .addCase(fetchShortlistedProfile.pending, (state, action) => { 
          if (state.matchingShortlistedLoading === 'idle') {
            state.matchingShortlistedLoading = 'pending'
            state.matchingStatusListError='';
          }
      })
      .addCase(fetchShortlistedProfile.rejected, (state, action) => {
        const { requestId } = action.meta
        if (
          state.matchingShortlistedLoading === 'pending' 
        ) {
          state.matchingShortlistedLoading = 'idle'
          state.matchingShortlistedError = "Unable to retrive data"
          state.currentRequestId = undefined
        }
      })
      .addCase(fetchProfiledetail.fulfilled, (state, action) => {
        const { requestId } = action.meta
        if (
          state.profileDetailStatus === 'pending' 
        ) {
          state.profileDetailStatus = 'idle'
          state.profileDetail=action.payload
          state.currentRequestId = undefined
        }
      })
      .addCase(fetchProfiledetail.pending, (state, action) => {
          if (state.profileDetailStatus === 'idle') {
            state.profileDetailStatus = 'pending'
            state.profileDetailError='';
          }
      })
      .addCase(fetchProfiledetail.rejected, (state, action) => {
        const { requestId } = action.meta
        if (
          state.profileDetailStatus === 'pending' 
        ) {
          state.profileDetailStatus = 'idle'
          state.profileDetailError = "Unable to retrive data"
          state.currentRequestId = undefined
        }
      })
      .addCase(fetchMatchingStatus.fulfilled, (state, action) => {
        const { requestId } = action.meta
        if (
          state.matchingStatusLoading === 'pending' 
        ) {
          state.matchingStatusLoading = 'idle'
          state.matchingStatus=action.payload
          state.currentRequestId = undefined
        }
      })
      .addCase(fetchMatchingStatus.pending, (state, action) => {      
          if (state.matchingStatusLoading === 'idle') {
            state.matchingStatusLoading = 'pending'
            state.profileDetailError='';
          }
      })
      .addCase(fetchMatchingStatus.rejected, (state, action) => {
        const { requestId } = action.meta
        if (
          state.matchingStatusLoading === 'pending' 
        ) {
          state.matchingStatusLoading = 'idle'
          state.matchingStatusError = "Unable to retrive data"
          state.currentRequestId = undefined
        }
      })
    }
  })
  
  export const { setMatches,setselectedProfileId,setPreferenceVisiable} = matcheSlice.actions
  export  const getMatches=(state:any)=>state.matchesData;


  export default matcheSlice.reducer