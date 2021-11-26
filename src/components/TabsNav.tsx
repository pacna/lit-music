// react
import { Component, SyntheticEvent } from 'react';

// @mui
import { Tabs, Tab, AppBar, Fab } from '@mui/material';

// @mui
import { Shuffle } from '@mui/icons-material';

// components
import { Songs } from './Songs'
import { Artists } from './Artists';
import { ReactAudioPlayer } from './AudioPlayer';
import { TabsNavProps, TabsNavStates } from '../interfaces/TabsNav.interface';
import { SongResponse } from '../interfaces';

enum TABS {
    SONGS = 0,
    ARTISTS = 1
}

export class TabsNav extends Component<TabsNavProps, TabsNavStates>{
    constructor(props: TabsNavProps){
        super(props)
        this.state = {
            currentTab: TABS.SONGS,
            soundWave: false
        }
    }

    changeTab = (evt: SyntheticEvent<Element, Event>, newValue: number): void => {
        this.setState({
            currentTab: newValue
        })
    }

    playRandomSong = (songs: Array<SongResponse>): void => {
        const {songFn} = this.props;
        let random = Math.floor(Math.random() * songs.length)
        songFn.setSongPath(songs[random].path, songs[random]._id, true);
    }

    showSoundWave = (): void => {
        this.setState({
            soundWave: true
        })
    }

    hideSoundWave = (): void => {
        this.setState({
            soundWave: false
        })
    }


    render(): JSX.Element {        
        const { currentTab, soundWave } = this.state
        const { SONGS, ARTISTS} = TABS;
        const {songs, artists, songFn} = this.props
        return(
            <div>
                <AppBar position="static">
                    <Tabs value={currentTab} onChange={this.changeTab} textColor="inherit" variant="fullWidth" indicatorColor="secondary">
                        <Tab label="Songs" />
                        <Tab label="Artists" />
                    </Tabs>
                </AppBar>
                {currentTab === SONGS && <Songs songs={songs} songFn={songFn} soundWave={soundWave}/>}
                {currentTab === ARTISTS && <Artists artists={artists} songFn={songFn}/>}
                <div>                    
                    <Fab onClick={() => this.playRandomSong(songs)} color="secondary" style={{position:"fixed", right: "1.5vw", bottom: "8vw"}}>
                        <Shuffle />
                    </Fab>
                </div>
                <div>
                    <ReactAudioPlayer 
                        src={songFn.getSongPath().path}
                        showSoundWave={this.showSoundWave}
                        hideSoundWave={this.hideSoundWave}
                    />
                </div>
            </div>
        )
    }
}