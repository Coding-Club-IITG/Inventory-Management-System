import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar';
import Filter from '../components/filter/filter.jsx'
import RequestSent from '../components/RequestSent';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Sent = (props) => {

    const [data, setData] = useState([]);
    const { user, setUser, authRoot, serverRoot } = props;
    const [openErrorMsg, setOpenErrorMsg] = useState(false);
    const [openNetworkErrorMsg, setOpenNetworkErrorMsg] = useState(false);
    const [query, setQuery] = useState("");
    const {startDate, setStartDate, endDate, setEndDate, clubName, setClubName, catName, setCatName}=props;

    const navigate = useNavigate();
    const handleClickErrorMsg = () => {
        setOpenErrorMsg(true);
    };

    const handleCloseErrorMsg = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenErrorMsg(false);
    };
    const handleClickNetworkErrorMsg = () => {
        setOpenNetworkErrorMsg(true);
    };

    const handleCloseNetworkErrorMsg = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenNetworkErrorMsg(false);
    };
    const fetchData = async (club, token) => {
        try {
            const options = { "user": club };
            const resp = await axios.get(serverRoot+"/request/sent", { params: options, headers: {"Authorization" : `Bearer ${token}`} });
            setData(resp.data);
            // console.log(resp.data);
        }
        catch (e) {
            // console.log("Sent.js - Network error in fetchData");
            if (e.response.status === 401) {
                handleClickErrorMsg();
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            }
            else {
                // console.log("Sent.js - Network error in validate token");
                handleClickNetworkErrorMsg();
            }
        }
    }

    const validateToken = async (token) => {
        try {
            const credentials = { jwt: token };
            const resp = await axios.post(authRoot+"/checkToken", credentials);
            setUser(resp.data.user);
            fetchData(resp.data.user.club, token);
        }
        catch (e) {
            if (e.response.status === 401) {
                handleClickErrorMsg();
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            }
            else {
                // console.log("Sent.js - Network error in validate token");
                handleClickNetworkErrorMsg();
            }
        }
    }
    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('rim-jwt'));
        if (token) {
            validateToken(token);
        }
        else {
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        }

        //eslint-disable-next-line
    }, []);

    const vertical = 'top'
    const horizontal = 'center';
    return (
        <div className="bg-[#011018]">
            <Snackbar open={openErrorMsg} autoHideDuration={6000} onClose={handleCloseErrorMsg} anchorOrigin={{ vertical, horizontal }}>
                <Alert onClose={handleCloseErrorMsg} severity="error" sx={{ width: '100%' }}>
                    Session expired. Please login again!
                </Alert>
            </Snackbar>
            <Snackbar open={openNetworkErrorMsg} autoHideDuration={6000} onClose={handleCloseNetworkErrorMsg} anchorOrigin={{ vertical, horizontal }}>
                <Alert onClose={handleCloseNetworkErrorMsg} severity="error" sx={{ width: '100%' }}>
                    Network error. Please try again later!
                </Alert>
            </Snackbar>
            <Navbar data={data} setData={setData} onQuery={setQuery}/>
            <div className='min-h-screen flex flex-row gap-4 p-4'>
                <Filter data = {data} setStartDate={setStartDate} setEndDate={setEndDate} clubName={clubName} setClubName={setClubName} catName={catName} setCatName={setCatName}></Filter>
                <RequestSent data={data} setData={setData} user={user} serverRoot={serverRoot} query={query} clubName={clubName} catName={catName} startDate={startDate} endDate={endDate}></RequestSent>
            </div>
        </div>
    )
}

export default Sent