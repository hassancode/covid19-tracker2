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
export const SideDrawer = ({ mobileOpen, handleDrawerToggle }) => {
    //const { window } = undefined;//props;
    const classes = useStyles();
    const theme = useTheme();
    const [countryData, setCountryData] = useState({countries:[], filtered: []});

    useEffect(() => {
        const fetchApi = async () => {
            const data = await fetchCountries();
            setCountryData({countries: data, filtered: data});
        };
        fetchApi();
    }, []);

    String.prototype.toTitle = function() {
        return this.replace(/(^|\s)\S/g, function(t) { return t.toUpperCase() });
      }

    //const countries = ['United States', 'Pakistan'];
    function handleChange(e) {
        var filteredList = countryData.countries.filter(country => country.startsWith(e.target.value.toTitle()))
        if(filteredList.length > 0){
            console.log(filteredList)
        setCountryData({countries: countryData.countries, filtered: filteredList });
        }
    }

    const drawer = (
        <div>
            {/* <div className={classes.toolbar} /> */}
            <SearchCountry handleChange={handleChange} />
            <Divider />
            <List>
                {countryData.filtered.map((text, index) => (
                    <ListItem button key={text}>
                        {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            {/* <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List> */}
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
