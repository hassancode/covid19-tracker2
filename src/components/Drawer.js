import React, { useState, useEffect } from 'react'
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import SearchCountry from './SearchCountry'
import { fetchCountries } from '../apis/CovidApi';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { CountryList } from './CountryList';

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
         backgroundColor: 'rgba(34, 34, 34)',
         color: 'aliceblue'
    }
}))
export const SideDrawer = ({ mobileOpen, handleDrawerToggle, handleCountrySelected, geoData, closeDrawer }) => {
    //const { window } = undefined;//props;
    const classes = useStyles();
    const theme = useTheme();
    const [countryData, setCountryData] = useState({ countries: [], filtered: [] });
    //const [isCountryListLoaded, setCountryListLoaded] = useState(false);
    const matches = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        const fetchApi = async () => {
            const data = await fetchCountries();
            if (data) {
                data.unshift({ name: 'Global', code: 'GL' });
                setCountryData({ countries: data, filtered: data });
            }
        };
        fetchApi();
    }, []);

    //if (geoData) {
        //var countries = geoData.features.map(feature => feature.properties.name)
        //console.log('geo data', countries);
    //}

    function onCountrySelect(code) {
        if (matches) {
            closeDrawer();
        }
        handleCountrySelected(code);
    }

    function toTitles(s) { return s.replace(/\w\S*/g, function (t) { return t.charAt(0).toUpperCase() + t.substr(1).toLowerCase(); }); }

    function handleChange(e) {
        var input = toTitles(e.target.value);
        var filteredList = countryData.countries.filter(country => input === '' || country.name.includes(input))
        setCountryData({ countries: countryData.countries, filtered: filteredList });
    }

    const drawer = (
        <div>
            <SearchCountry handleChange={handleChange} />
            <Divider />
            <CountryList data={countryData.filtered} onCountrySelect={onCountrySelect}/>
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
