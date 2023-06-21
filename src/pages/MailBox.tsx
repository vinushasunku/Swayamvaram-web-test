import React, { useEffect } from "react";
import "../styles/styles.module.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Container, Row, Card , Nav, Button, Col} from "react-bootstrap";
import { Tabs, Tab, Card, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchMatchesProfilelistsByStatus } from "../redux/slices/matches";
import { MatchesInfoDto, SelectedStatus } from "../services/MatchesService";


export const MailBox = () => {
    const loginprofileDetail = useAppSelector(state => state.loginId.profileData);
    //const getMatchPendingList = useAppSelector(state => state.matches.matchesProfileListByStatus);
    // const selectedStatus = useAppSelector(
    //     state => state.matches.selectedStatus,
    // );
    const dispatch: any = useAppDispatch();
    const [pendingdata, setPendingDate] = React.useState([]);
    const [declinedata, setDeclineDate] = React.useState([]);
    const [acceptdata, setAcceptDate] = React.useState([]);
    useEffect(() => {
        console.log('logindetail', loginprofileDetail?.id)
        fetchPendingProfileData()
        FetchRejectedData()
        fetchAcceptProfileData()
    }, [])
    const fetchPendingProfileData = () => {
        if (loginprofileDetail?.id) {
            const selectdata: SelectedStatus = {
                accountId: loginprofileDetail?.id,
                status: "REQUEST_SENT"
            }
            dispatch(fetchMatchesProfilelistsByStatus(selectdata))
                .unwrap()
                .then((response: any) => {
                    setPendingDate(response)
                    console.log('fetchdata', response)
                })
                .catch((error: any) => {
                    console.log('get matches list', error);
                });
        }
        //setData(getMatchList);
    };
    function FetchRejectedData(){
        if (loginprofileDetail?.id) {
            const selectdata: SelectedStatus = {
                accountId: loginprofileDetail?.id,
                status: "REJECT"
            }
            dispatch(fetchMatchesProfilelistsByStatus(selectdata))
            .unwrap()
            .then((response:any) => {
              setDeclineDate(response)
            })
            .catch((error: any) => {
              console.log('get matches list', error);
            });
        }
      }

      function fetchAcceptProfileData() {
    if (loginprofileDetail?.id) {
        const selectdata: SelectedStatus = {
            accountId: loginprofileDetail?.id,
            status: "ACCEPT"
        }
        dispatch(fetchMatchesProfilelistsByStatus(selectdata))
        .unwrap()
        .then((response:any) => {
          setAcceptDate(response)
        })
        .catch((error: any) => {
          console.log('get matches list', error);
        });
    }
    //setData(getMatchList);
  };
    return (
        <Tabs>
            <Tab eventKey="pending" title="Pending">
                {
                    <Card>
                        <Row xs={1} md={4} className="g-4 p-4">
                            {pendingdata != undefined && pendingdata.map((item:MatchesInfoDto, i) => (
                                
                                item.accountId != null ?<Col key={item.accountId+i}>
                                    <Card>
                                        <Card.Img variant="top" src="https://notjustdev-dummy.s3.us-east-2.amazonaws.com/uber-eats/restaurant1.jpeg" />
                                        <Card.Body>
                                            <Card.Text>
                                                {item?.firstName +
                                                    ' ' +
                                                    item?.lastName}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col> :<></>
                            ))}
                        </Row>
                    </Card>

                }
            </Tab>
            <Tab eventKey="Accept" title="Accept">
            {
                    <Card>
                        <Row xs={1} md={2} className="g-4 p-4">
                            {
                            acceptdata !== undefined && acceptdata.map((item:MatchesInfoDto, i) => (
                                
                                item.accountId != null ?<Col key={item.accountId+i}>
                                    <Card>
                                        <Card.Img variant="top" src="https://notjustdev-dummy.s3.us-east-2.amazonaws.com/uber-eats/restaurant1.jpeg" />
                                        <Card.Body>
                                            <Card.Text>
                                                {item?.firstName +
                                                    ' ' +
                                                    item?.lastName}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col> :<></>
                            ))}
                        </Row>
                    </Card>

                }
            </Tab>
            <Tab eventKey="Reject" title="Reject">
            {
                    <Card>
                        <Row xs={1} md={4} className="g-4 p-4">
                            {
                            declinedata !==  undefined && declinedata.map((item:MatchesInfoDto, i) => (
                                
                                item.accountId != null ?<Col key={item.accountId+i}>
                                    <Card>
                                        <Card.Img variant="top" src="https://notjustdev-dummy.s3.us-east-2.amazonaws.com/uber-eats/restaurant1.jpeg" />
                                        <Card.Body>
                                            <Card.Text>
                                                {item?.firstName +
                                                    ' ' +
                                                    item?.lastName}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col> :<></>
                            ))}
                        </Row>
                    </Card>

                }
            </Tab>
        </Tabs>
    );
}

export default MailBox