import * as React from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { baseUrl } from "../../server"

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

function Dashboard() {
    const [Data, setData] = React.useState([]);
    React.useEffect(() => {
        const Email = localStorage.getItem('email')
        console.log(Email);
        axios.post(`${baseUrl}/api/v1/profile`, {
            email: Email
        })
            .then((res) => {
                let data = res.data
                setData(data);
                console.log(Data);
            })
            .catch((err) => {
                console.log(err.message);
            })
        return () => {
            console.log('clean up')
        }
    }, [])
    return (
        <div className="dashboard">
            <div>
                <h1>Dashboard</h1>
                {
                    Data.map(eachData => {
                        return (
                            <div style={{ margin: "2rem" }}>
                                <Card sx={{ minWidth: 275 }}>
                                    <CardContent>
                                        <Typography variant="h4" component="div">
                                        {eachData.name}
                                        </Typography>
                                        <Typography variant="h6" component="div">
                                            {eachData.email}
                                        </Typography>
                                        <Typography variant="h6" component="div">
                                            {eachData.address}
                                        </Typography>
                                        <Typography variant="h6" component="div">
                                            {eachData.phoneNumber}
                                        </Typography>
                                        <Typography variant="h6" component="div">
                                            {eachData.gender}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default Dashboard;