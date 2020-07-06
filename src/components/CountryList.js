import React from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export const CountryList = ({data, onCountrySelect}) => {
    return (
        <div>
             <List>
                {data.map((country) => (
                    <ListItem button key={country.code}>
                        <ListItemText primary={country.name} onClick={() => onCountrySelect(country.code)} />
                    </ListItem>
                ))}
            </List>
        </div>
    )
}