import { useEffect } from "react";
import {  Container, Nav, Navbar as NavbarBs } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import { useAppSelector } from "../redux/hooks";

export const Navbar=() =>{
    const registrationStatus = useAppSelector(
      state => state.loginId.registrationComplete,
    );
    useEffect(() => {
     console.log('registration', registrationStatus)
    }, [registrationStatus]);
    return (
      <NavbarBs sticky="top" className="bg-white shadow-sm mb-3">
        <Container>

          <Nav className="container-fluid">
          <Nav.Item>
          <h3 className="pe-5">Swayamvaram</h3>
          </Nav.Item>
          <Nav.Item>
          <Nav.Link to="/mailBox" as={NavLink}>
              MailBox
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
          <Nav.Link to="/search" as={NavLink}>
              Search
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
          <Nav.Link to="/matches" as={NavLink}>
              Matches
            </Nav.Link>
          </Nav.Item>

          </Nav>

          <Nav className="mr-auto">
          <div style={{flexDirection:'row'}}>
          <img   src="https://notjustdev-dummy.s3.us-east-2.amazonaws.com/uber-eats/restaurant1.jpeg"
          alt="example" style={{width:50, height:50, borderRadius:25}}/>
          </div>  
          {
            registrationStatus === false ?<Nav.Link to="/" as={NavLink}>
            Login
        </Nav.Link>:<></>
          }
          
          </Nav>
          
        </Container>
      </NavbarBs>
    )
  }

  export default Navbar