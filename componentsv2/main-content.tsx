import React, { Fragment, ReactElement } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { closeDrawer } from "../reducers/toggle-drawer-slice";
import { Sidebar } from "./sidebar";
import { ReactAudioPlayer } from "./react-audio-player"

export const MainContent = (props: { children: ReactElement}): JSX.Element => {
    const toggleDrawer = useSelector((state: RootStateOrAny) => state.toggleDrawer.value);
    const dispatch = useDispatch();
    const songData = useSelector((state: RootStateOrAny) => state.songData.value);
    const { children } = props;

    const hideDrawer = (): void => {
        dispatch(closeDrawer());
    }

    return (
        <div>
            <Sidebar
                    toggle={toggleDrawer}
                    closeDrawer={hideDrawer}
                    songFn={null} 
            />
            <Fragment> { children } </Fragment>
            <ReactAudioPlayer
                src={songData.path} 
            />
        </div>
    )
}