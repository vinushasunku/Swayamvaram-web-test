import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

// import "bootstrap/dist/css/bootstrap.min.css";
// import { Container, Row, Card , Nav, Button, Col} from "react-bootstrap";
import { Tabs, Tab, Card, Row, Col, Button, } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchMatcheslists, fetchMatchesProfilelistsByStatus } from "../redux/slices/matches";
import { MatchesInfoDto, MatchesPageInfoDto, SelectedStatus } from "../services/MatchesService";
import Colors from '../styles/colors';
import styles from "../styles/styles.module.css"; 

export const Matches = () => {
    const loginprofileDetail = useAppSelector(state => state.loginId.profileData);
    const getPagetokenInfo = useAppSelector(state => state.matches.matchesPageInfo);
    const [pagetoken, setPreviousPagetoken] = React.useState(1);
    const [doneLoading, setStatusLoading] = useState(false);
    const [data, setData] = useState([] as any);
    const getMatchList = useAppSelector(state => state.matches.matchesData);
    const dispatch: any = useAppDispatch();
    useEffect(() => {
        console.log('logindetail', loginprofileDetail?.id)
        fetchData()
    },[])

    // useLayoutEffect(() => {
    //     console.log(firstUpdate.current)
    //   if (firstUpdate.current) {
    //     firstUpdate.current = false;
    //     fetchData()
    //     return;
    //   }
  
    //   console.log("componentDidUpdateFunction");
    // });
    
    const fetchData =  () => {
        if (loginprofileDetail.id) {
            const requestinfo: MatchesPageInfoDto = {
                accountId: loginprofileDetail.id,
                pageToke: pagetoken
            }
            console.log(requestinfo);
            dispatch(fetchMatcheslists(requestinfo))
                .unwrap()
                .then((response: any) => {
                    console.log(response)
                    setData(response);
                })
                .catch((error: any) => {
                    console.log('get matches list', error);
                });
        }
        //setData(getMatchList);
    };
    return (


        <Card>
            <Row xs={1} md={3} className="g-4 p-4">
                {data != undefined && data.map((item: MatchesInfoDto, i: string) => (

                    <Col key={i}>
                        <Card>
                        <div onClick={() => {alert("Hello from here"+item.accountId)}}>
                        <Card.Img variant="top" src="https://notjustdev-dummy.s3.us-east-2.amazonaws.com/uber-eats/restaurant1.jpeg" />
                        </div>

                            <Card.Body className="text-center">
                                <Card.Text>
                                    {item?.firstName +
                                        ' ' +
                                        item?.lastName}
                                </Card.Text>
                                
                               
                                    <Button  style={{ background: Colors.FrenchRose, borderColor: Colors.FrenchRose, marginRight:10 }} >
                                        Send Request
                                    </Button>{' '}
                                    <Button style={{ background: Colors.FrenchRose, borderColor: Colors.FrenchRose, marginRight:10 }} >
                                        Not Intrested
                                    </Button>
                             
                            </Card.Body>


                        </Card>
                    </Col>
                ))}
            </Row>
        </Card>



    );
}

export default Matches