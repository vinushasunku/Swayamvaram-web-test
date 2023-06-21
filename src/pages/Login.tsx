
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
// import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/hooks';
import { setProfileInfo, setResitrationInfo } from '../redux/slices/login';
import { setAccountId } from '../redux/slices/registration';
import { createSecureService } from '../services/APIServices';
import LoginService from '../services/LoginService';


const LoginPage = ({ navigation }: any) => {
    const dispatch = useAppDispatch();
    const [passwordinput, setPassword] = React.useState('');
    const [emailinput, setEmailPassword] = React.useState('');
    const navigate = useNavigate();
    useEffect(() => {
        createSecureService();
    }, [navigation]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        if (event.target.name === 'email') {
            setEmailPassword(event.target.value.toLowerCase())
        }
        if (event.target.name === 'password') {
            setPassword(event.target.value)
        }
    };
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const logindto = {
            emailAddress: emailinput,
            password: passwordinput
        }
        LoginService.getLoginDetail(logindto).then((response:any)=>{
            if(response){
                alert('success')
              console.log('profiledata',response.data.religionDetails)
                dispatch(setProfileInfo(response.data))
                dispatch(setAccountId(response.data.id))
                if(response.data.personalDetails != null &&
                  response.data.familyDetails !=null && 
                  response.data.locationDetails !=null && 
                   response.data.educationDetails !=null && 
                   response.data.professionDetails !=null && 
                  response.data.familyDetails != null 
                  && response.data.religionDetails != null
                   ){
                    console.log('logged info',response)
                 dispatch(setResitrationInfo(true))
                 navigate('/mailbox');
                 
                }else{
                //   navigation.navigate('Registration');
                }
              
            }
        }).catch((error:any)=>{
            console.log('error:',error)})

    };

    return (
        <>
            <div className="container">
                <div className="w-50">
                    <form className="card p-4 mt-4" onSubmit={handleSubmit}>
                        <h1>Login Form Example</h1>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                Email address
                            </label>
                            <input
                                type="email"
                                name="email"
                                onChange={handleChange}
                                value={emailinput}
                                className="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={passwordinput}
                                onChange={handleChange}
                                className="form-control"
                                id="exampleInputPassword1"
                            />
                        </div>

                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </form>
                    {/* <div className="mt-4 bg-light p-2">
          <p>{JSON.stringify(state.user)}</p>
        </div> */}
                </div>
            </div>
        </>

    );
};


export default LoginPage

