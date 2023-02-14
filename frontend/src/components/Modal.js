import React, { useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Modal() {
    const [openRequest, setOpenRequest] = useState(false);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [startValue, setStartValue] = React.useState(dayjs());
    const [endValue, setEndValue] = React.useState(dayjs());
    const [purchaseDate, setPurchaseDate] = React.useState(dayjs());
    const [ownedBy, setOwnedBy] = React.useState('');
    const [category, setCategory] = React.useState('');
    const handleOwnership = (event) => {
        setOwnedBy(event.target.value);
    };
    const handleCategory = (event) => {
        setCategory(event.target.value);
    };

    // const [value, setValue] = React.useState(dayjs());

    const handleClickOpenRequest = () => {
        setOpenRequest(true);
    };

    const handleCloseRequest = () => {
        setOpenRequest(false);
    };

    const handleClickOpenAddModal = () => {
        setOpenAddModal(true);
    };

    const handleCloseAddModal = () => {
        setOpenAddModal(false);
    };

    return (
        <div className='h-screen flex flex-col justify-center items-center border gap-12'>
            <Button variant="contained" onClick={handleClickOpenRequest}>
                Request modal
            </Button>
            <Button variant="contained" onClick={handleClickOpenAddModal}>
                Add an item modal
            </Button>
            <Dialog open={openRequest} onClose={handleCloseRequest}>
                <DialogTitle className='bg-[#032538] text-white flex justify-between'>
                    <div className='text-2xl'>Request Form</div>
                    <div className='grid grid-cols-2 items-center'>
                        <p className='text-base text-right mr-4 text-white/90'>Item: </p>
                        <p className='text-sm font-normal text-white/80'>Hp Monitor</p>
                        <p className='text-base text-right mr-4 text-white/90'>Owned By: </p>
                        <p className='text-sm font-normal text-white/80'>Coding Club</p>
                        <p className='text-base text-right mr-4 text-white/90'>Requested By: </p>
                        <p className='text-sm font-normal text-white/80'>4i Labs</p>
                    </div>
                </DialogTitle>
                <DialogContent>
                    {/* <DialogContentText>
                        To subscribe to this website, please enter your email address here. We
                        will send updates occasionally.
                    </DialogContentText> */}
                    <h3 className='font-medium mt-2 mb-4'>Select Time</h3>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <div className='flex justify-between gap-8'>
                            <DateTimePicker
                                renderInput={(props) => <TextField {...props} />}
                                label="From"
                                value={startValue}
                                onChange={(newValue) => {
                                    setStartValue(newValue);
                                }}
                            />
                            <DateTimePicker
                                renderInput={(props) => <TextField {...props} />}
                                label="To"
                                value={endValue}
                                onChange={(newValue) => {
                                    setEndValue(newValue);
                                }}
                            />
                        </div>
                    </LocalizationProvider>
                    <div className='mt-8 flex flex-col gap-8'>
                        <TextField id="remarks" label="Purpose/Remarks" variant="outlined" />
                        <TextField required id="remarks" label="Quantity" variant="outlined" />
                    </div>
                </DialogContent>
                <DialogActions className='m-4 flex gap-2'>
                    <Button variant="outlined" onClick={handleCloseRequest} style={{
                        // backgroundColor: "#021018",
                        color: "#021018",
                        border: "1px solid #021018",
                        padding: "0.5rem 2rem",
                        // boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -4px rgb(0 0 0 / 0.3)"
                    }}>Cancel</Button>
                    <Button variant="contained" onClick={handleCloseRequest} style={{
                        backgroundColor: "#021018",
                        color: "white",
                        padding: "0.5rem 2rem",
                        // boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -4px rgb(0 0 0 / 0.3)"
                    }}>Submit</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openAddModal} onClose={handleCloseAddModal}>
                <DialogTitle className='bg-[#032538] text-white'>
                    <div className='text-2xl'>Add an Item</div>
                </DialogTitle>
                <DialogContent>
                    {/* <DialogContentText>
                        To subscribe to this website, please enter your email address here. We
                        will send updates occasionally.
                    </DialogContentText> */}
                    <div className='mt-8 flex flex-col gap-8'>
                        <TextField id="item-name" label="Item Name" variant="outlined" />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <div className='grid grid-cols-2 gap-8'>
                                <TextField id="quantity" label="Quantity" variant="outlined" />
                                <DateTimePicker
                                    renderInput={(props) => <TextField {...props} />}
                                    label="Purchase Date"
                                    value={purchaseDate}
                                    onChange={(newValue) => {
                                        setPurchaseDate(newValue);
                                    }}
                                />
                            </div>
                        </LocalizationProvider>
                        <div className='grid grid-cols-2 gap-8'>
                            <FormControl fullWidth>
                                <InputLabel id="owned-by">Owned By</InputLabel>
                                <Select
                                    id="owned-by"
                                    value={ownedBy}
                                    label="Owned By"
                                    onChange={handleOwnership}
                                >
                                    <MenuItem value={"coding_club"}>Coding Club</MenuItem>
                                    <MenuItem value={"design_club"}>Design Club</MenuItem>
                                    <MenuItem value={"robotics_club"}>Robotics Club</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel id="category">Category</InputLabel>
                                <Select
                                    id="category"
                                    value={category}
                                    label="Category"
                                    onChange={handleCategory}
                                >
                                    <MenuItem value={"major"}>Major Equipment</MenuItem>
                                    <MenuItem value={"minor"}>Minor Equipment</MenuItem>
                                    <MenuItem value={"consumables"}>Consumables</MenuItem>
                                    <MenuItem value={"furniture"}>Furniture</MenuItem>
                                    <MenuItem value={"books"}>Books</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className='grid grid-cols-3 gap-8'>
                            <div>
                                <p className='font-medium'>Bill</p>
                                <Button variant="outlined" component="label" fullWidth>
                                    Upload
                                    <input hidden accept="image/*" multiple type="file" />
                                </Button>
                            </div>
                            <div>
                                <p className='font-medium'>Sanction letter</p>
                                <Button variant="outlined" component="label" fullWidth>
                                    Upload
                                    <input hidden accept="image/*" multiple type="file" />
                                </Button>
                            </div>
                            <div>
                                <p className='font-medium'>Purchase order</p>
                                <Button variant="outlined" component="label" fullWidth>
                                    Upload
                                    <input hidden accept="image/*" multiple type="file" />
                                </Button>
                            </div>
                        </div>
                        {/* <TextField required id="remarks" label="Quantity" variant="outlined" /> */}
                        <TextField id="remarks" label="Remarks/Description" variant="outlined" />
                    </div>
                </DialogContent>
                <DialogActions className='m-4 flex gap-2'>
                    <Button variant="outlined" onClick={handleCloseAddModal} style={{
                        // backgroundColor: "#021018",
                        color: "#021018",
                        border: "1px solid #021018",
                        padding: "0.5rem 2rem",
                        // boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -4px rgb(0 0 0 / 0.3)"
                    }}>Cancel</Button>
                    <Button variant="contained" onClick={handleCloseAddModal} style={{
                        backgroundColor: "#021018",
                        color: "white",
                        padding: "0.5rem 2rem",
                        // boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -4px rgb(0 0 0 / 0.3)"
                    }}>Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
