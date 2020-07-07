import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Typography, Divider } from '@material-ui/core';
import { CovidMap } from './CovidMap';
import NumberFormat from 'react-number-format';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexGrow: 1,
        [theme.breakpoints.up('sm')]: {
            marginLeft: 240
        },

    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(1),
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        backgroundColor: 'rgba(34, 34, 34)',
        color: 'aliceblue',
    },
    confirmed: {
        borderBottom: '6px solid #42a5f5'
    },
    recovered: {
        borderBottom: '6px solid #76ff03'
    },
    deaths: {
        borderBottom: '6px solid #f44336'
    },
    population: {
        borderBottom: '6px solid #e040fb'
    }
}));

export default function CenteredGrid({data, countryData, selectedCountry}) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Grid container spacing={1}>
                    <Grid item xs={6}>
                        <Paper className={`${classes.paper} ${classes.confirmed}`} >
                            <Typography variant="h5" gutterBottom><NumberFormat value={countryData && countryData.confirmed} displayType={'text'} thousandSeparator={true}></NumberFormat></Typography>
                            <Typography variant="subtitle1" gutterBottom>Confirmed Cases</Typography>
                            <Divider/>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                    <Paper className={`${classes.paper} ${classes.recovered}`}>
                            <Typography variant="h5" gutterBottom><NumberFormat value={countryData && countryData.recovered} displayType={'text'} thousandSeparator={true}></NumberFormat></Typography>
                            <Typography variant="subtitle1" gutterBottom>Recovered Cases</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                    <Paper className={`${classes.paper} ${classes.deaths}`}>
                            <Typography variant="h5" gutterBottom><NumberFormat value={countryData && countryData.deaths} displayType={'text'} thousandSeparator={true}></NumberFormat></Typography>
                            <Typography variant="subtitle1" gutterBottom>Deaths Cases</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                    <Paper className={`${classes.paper} ${classes.population}`}>
                            <Typography variant="h5" gutterBottom><NumberFormat value={countryData && countryData.pop_est} displayType={'text'} thousandSeparator={true}></NumberFormat></Typography>
                            <Typography variant="subtitle1" gutterBottom>Total Population</Typography>
                        </Paper>
                    </Grid>
                </Grid>
                <CovidMap data={data} selectedCountry={selectedCountry}/>  
            </main>
        </div>
    );
}