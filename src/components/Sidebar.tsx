import * as React from "react";

import { Button } from "components";
import { Flex } from "reflexbox";

import * as style from "styles/primary/components/Sidebar.scss";

interface ISidebarProps {
    onIncrease: Function;
    onDecrease: Function;
    onRemove: Function;
    onScrollUp: Function;
    onScrollDown: Function;
    scrollUpActive: boolean;
    scrollDownActive: boolean;
    active: boolean;
}

export default class Sidebar extends React.Component<ISidebarProps> {
    render() {
        const {
            scrollUpActive, scrollDownActive, onDecrease, onIncrease, onRemove, active, onScrollDown, onScrollUp
        } = this.props;

        return (
            <Flex column className={style.sidebar}>
                <Button icon="chevron-up" onClick={onScrollUp} disabled={!scrollUpActive}/>
                <Flex column auto justify="center">
                    <Button icon="plus" disabled={!active} onClick={onIncrease}/>
                    <Button icon="minus" disabled={!active} onClick={onDecrease}/>
                    <Button icon="trash" disabled={!active} onClick={onRemove}/>
                </Flex>
                <Button icon="chevron-down" onClick={onScrollDown} disabled={!scrollDownActive}/>
            </Flex>
        );
    }
}
