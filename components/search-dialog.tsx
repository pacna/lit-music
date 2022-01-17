// react
import { ChangeEvent, useEffect, useState } from 'react';

// material
import { 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogTitle, 
    Button, 
    TextField,
    ListItemText,
    List,
    ListItem,
    Divider
} from '@mui/material';

// types
import { SongResponse } from './types/api/song-response.interface';
import { SearchDialogProps } from './types';

// third party
import { useDispatch } from 'react-redux';
import axios, { AxiosResponse } from 'axios';

// others
import { setSongData } from '../reducers/song-data-slice';

export const SearchDialog = (props: SearchDialogProps): JSX.Element => {
    const { open, closeSearchDialog } = props;
    const [ isSearchDialogOpen, setSearchDialogOpen ] = useState(open);
    const [ input, setInput ] = useState('');
    const [ songs, setSongs ] = useState([] as Array<SongResponse>);
    const dispatch = useDispatch(); 

    const handleClose = (): void => {
        closeSearchDialog();
        setSearchDialogOpen(!open);
    }

    const handleInput = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setInput((event.target).value);
    }

    const setSongPath = (path: string, id: string, visible: boolean): void => {
        dispatch(setSongData({ path: path, id: id, visible: visible}));
    }

    const playMusic = (path: string, id: string): void => {
        setSongPath(path, id, true)
    }

    const getSongs = (): void => {
        axios.get(`${process.env.NEXT_PUBLIC_REACT_APP_API}/songs`)
            .then((response: AxiosResponse) => response.data)
            .catch((error: Error) => console.error(error))
            .then((result: Array<SongResponse>) => setSongs(result));
    }

    useEffect(() => {
        getSongs();
    }, []);

    return(
        <Dialog
            open={isSearchDialogOpen}
            onClose={handleClose}
            fullWidth={true}
            maxWidth = {'md'}
        >
            <DialogTitle>Search</DialogTitle>
            <DialogContent>
                <TextField label="Songs" fullWidth margin="dense" onChange={handleInput}/>
                    <List>
                        {
                            songs?.filter((song: SongResponse) => song.title.toLowerCase().indexOf(input!.toLowerCase()) !== -1).map((song: SongResponse, index: number)  => {
                                return(
                                    <div key={index}>
                                        <ListItem button  style={{paddingLeft: "0px"}} onClick={() => playMusic(song.path, song._id)}>
                                            <ListItemText primary={song.title} />
                                        </ListItem>
                                        <Divider />
                                    </div>  
                                )
                            })
                        }
                    </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">Close</Button>
            </DialogActions>
        </Dialog>
    )
}