// react
import {Component } from 'react';

// @mui
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

// @mui icons
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search'

// self props/states
import { TopNavProps, TopNavStates } from '../interfaces';

// components
import { SearchDialog } from './SearchDialog';
import { TabsNav } from './TabsNav';
import { Sidebar } from './Sidebar';

export class TopNav extends Component<TopNavProps, TopNavStates>{
    constructor(props: TopNavProps){
        super(props)

        this.state = {
            toggle: false,
            searchOpen: false,
            favOpen: false
        }
    }

    toggleDrawer = (): void => {
        this.setState({
            toggle: true
        })
    }
    
    closeDrawer = (): void => {
        this.setState({
            toggle: false
        })
    }

    openFavDialog = (): void => {
        this.setState({
            favOpen: true
        })
    }

    closeFavDialog = (): void => {
        this.setState({
            favOpen: false
        })
    }

    openSearchDialog = (): void => {
        this.setState({
            searchOpen: true
        })
    }

    closeSearchDialog = (): void => {
        this.setState({
            searchOpen: false
        })
    }

    render(): JSX.Element {
        const {toggle, searchOpen, favOpen} = this.state
        const { songs, artists, songFn } = this.props;
        return(
            <div>
                <AppBar position="static">
                    <Toolbar style={{paddingLeft: "0px"}}>
                        <Grid container spacing={6} alignItems="center">
                            <Grid item xs={2} >
                                <IconButton onClick={this.toggleDrawer} style={{color: "white"}}>
                                    <MenuIcon />
                                </IconButton>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="h6" style={{color: "white"}}>
                                    Music Library
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <IconButton onClick={this.openSearchDialog} style={{color: "white", float: "right"}}>
                                    <SearchIcon />
                                </IconButton>                               
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
                <TabsNav songs={songs} artists={artists} songFn={songFn}/>
                {
                    searchOpen && <SearchDialog songFn={songFn} open={searchOpen} closeSearchDialog={this.closeSearchDialog} songs={songs}/>
                }
                <Sidebar
                    toggle={toggle}
                    closeDrawer={this.closeDrawer}
                    closeFavDialog={this.closeFavDialog}
                    openFavDialog={this.openFavDialog}
                    favOpen={favOpen}
                    songFn={songFn}
                />
            </div>
        )
    }
}