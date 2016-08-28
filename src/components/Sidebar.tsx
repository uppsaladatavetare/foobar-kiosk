import * as React from "react";

import { Button } from "components";
import { Flex } from "reflexbox";

import * as style from "styles/components/Sidebar.scss";

interface ISidebarProps {
    onIncrease: Function;
    onDecrease: Function;
    onRemove: Function;
    onScrollUp: Function;
    onScrollDown: Function;
    scrollUpActive: boolean;
    scrollDownActive: boolean;
    active: boolean;
    addRandomProduct?: Function;
}

export default class Sidebar extends React.Component<ISidebarProps, {}> {
    render() {
        return (
            <Flex column className={style.sidebar}>
                <Button icon="chevron-up" onClick={this.props.onScrollUp} disabled={!this.props.scrollUpActive}/>
                <Flex column auto justify="center">
                    <Button icon="plus" disabled={!this.props.active} onClick={this.props.onIncrease}/>
                    <Button icon="minus" disabled={!this.props.active} onClick={this.props.onDecrease}/>
                    <Button icon="trash" disabled={!this.props.active} onClick={this.props.onRemove}/>
                </Flex>
                <Button icon="chevron-down" onClick={this.props.onScrollDown} disabled={!this.props.scrollDownActive}/>
                {(process.env.NODE_ENV === "development" ? (
                    <Button icon="plus" onClick={this.props.addRandomProduct}/>
                ) : undefined)}
            </Flex>
        );
    }
}
