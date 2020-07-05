import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import { CovidMap } from './CovidMap';

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
}));

export default function CenteredGrid({data, countryData}) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Grid container spacing={1}>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>
                            <Typography variant="h5" gutterBottom>{countryData && countryData.confirmed}</Typography>
                            <Typography variant="subtitle1" gutterBottom>Confirmed Cases</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                    <Paper className={classes.paper}>
                            <Typography variant="h5" gutterBottom>{countryData && countryData.recovered}</Typography>
                            <Typography variant="subtitle1" gutterBottom>Recovered Cases</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                    <Paper className={classes.paper}>
                            <Typography variant="h5" gutterBottom>{countryData && countryData.deaths}</Typography>
                            <Typography variant="subtitle1" gutterBottom>Deaths Cases</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                    <Paper className={classes.paper}>
                            <Typography variant="h5" gutterBottom>{countryData && countryData.pop_est}</Typography>
                            <Typography variant="subtitle1" gutterBottom>Total Population</Typography>
                        </Paper>
                    </Grid>
                </Grid>
                <CovidMap data={data}/>
               
            </main>
        </div>
    );
}