import * as React from 'react';
import { useState } from 'react';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import styled from "styled-components";


const Wrap = styled.div`

    display: flex;
    flex-direction: row;
    gap: 8px;

`;

function DayTimeSelector(props) {
  
  var [date1, setDate] = React.useState(dayjs("01/01/1950", 'DD/MM/YYYY'));

  const handleChange = (date) => {


      setDate(date);
      props.list(date);
      // console.log(event);
    };
    
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Wrap>
            <DatePicker
                label="From Date"
                value={date1}
                inputFormat="DD/MM/YYYY"
                onChange={(date1) => handleChange(date1)}
                renderInput={(params) => <TextField {...params} />}
            />
        </Wrap>

    </LocalizationProvider>
  );
}

function DayTimeSelector2(props) {

  var [date2, setDate] = React.useState(dayjs());

  const handleChange = (date) => {


    setDate(date);
    props.list2(date);
    // console.log(event);
  };


  

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Wrap>
            <DatePicker
                label="To Date"
                value={date2}
                inputFormat="DD/MM/YYYY"
                onChange={(date) => handleChange( date)}
                renderInput={(params) => <TextField {...params} />}
            />
        </Wrap>

    </LocalizationProvider>
  );
}


const Heading = styled.div`

  color: #032538;
  font-weight: 500;
  font-size: 18px;
  line-height: 16px;
  /* identical to box height, or 89% */

  letter-spacing: 0.32px;
  margin : 16px 0px 24px 0px;

`;

export default function DayTime(props){

  const [startDate, getStartDate] = useState();
  const [endDate, getEndDate] = useState();

  props.startDate(startDate);
  props.endDate(endDate);

  return(
    <div>
      <Heading>Purchased On</Heading>
      <Wrap>
        <DayTimeSelector list = {getStartDate}></DayTimeSelector>
        <DayTimeSelector2 list2 = {getEndDate}></DayTimeSelector2>
      </Wrap>

    </div>

  )

}