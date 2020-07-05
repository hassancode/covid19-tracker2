import React, { useState, useEffect } from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import SearchCountry from './SearchCountry'
import { fetchCountries } from '../apis/CovidApi';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    drawerPaper: {
        width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
}))
export const SideDrawer = ({ mobileOpen, handleDrawerToggle, handleCountrySelected, geoData }) => {
    //const { window } = undefined;//props;
    const classes = useStyles();
    const theme = useTheme();
    const [countryData, setCountryData] = useState({ countries: [], filtered: [] });

    useEffect(() => {
        const fetchApi = async () => {
            const data = await fetchCountries();
            data.unshift({ name: 'Global', code: 'GL'});
            setCountryData({ countries: data, filtered: data });

            //if(geoData){
        //var countries = geoData.features.map(feature=>feature.properties.name)
  //  }
        };
        fetchApi();
        
    }, []);

    function toTitles(s) { return s.replace(/\w\S*/g, function (t) { return t.charAt(0).toUpperCase() + t.substr(1).toLowerCase(); }); }

    function handleChange(e) {
        var input = toTitles(e.target.value);
        var filteredList = countryData.countries.filter(country => input === '' || country.name.includes(input))
        setCountryData({ countries: countryData.countries, filtered: filteredList });
    }

    const drawer = (
        <div>
            {/* <div className={classes.toolbar} /> */}
            <SearchCountry handleChange={handleChange} />
            <Divider />
            <List>
                {countryData.filtered.map((country, index) => (
                    <ListItem button key={country.name}>
                        {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
                        <ListItemText primary={country.name} onClick={(e)=>handleCountrySelected(country.code)} />
                    </ListItem>
                ))}
            </List>
        </div>
    );

    //const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <nav className={classes.drawer} aria-label="mailbox folders">
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Hidden smUp implementation="css">
                <Drawer
                    //container={container}
                    variant="temporary"
                    anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                >
                    {drawer}
                </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
                <Drawer
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    variant="permanent"
                    open
                >
                    {drawer}
                </Drawer>
            </Hidden>
        </nav>
    )
}
