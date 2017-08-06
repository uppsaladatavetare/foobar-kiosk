import * as React from "react";
import * as ReactDOM from "react-dom";
import * as classNames from "classnames";
import * as style from "styles/common/App.scss";
import configureStore from "store/configureStore";
import PrimaryScreen from "components/PrimaryScreen";
import SecondaryScreen from "components/SecondaryScreen";
import { Provider, connect } from "react-redux";
import { Flex } from "reflexbox";
import { DevToolbar } from "components";
import { IAppProps } from "types";

class App extends React.Component<IAppProps> {
    render() {
        const classList = classNames({
            [style.fillScreen]: config.SCREEN === 'secondary'
        });
        return (
            <Flex column className={classList}>
                {this.renderDevToolbar()}
                {this.renderApp()}
            </Flex>
        );
    }

    renderDevToolbar() {
        if (__DEV__) {
            return (
                <DevToolbar
                    dispatch={this.props.dispatch}
                    account={this.props.account}
                />
            );
        }
    }

    renderApp() {
        if (config.SCREEN === 'primary') {
            return (<PrimaryScreen {...this.props} />);
        } else if (config.SCREEN === 'secondary') {
            return (<SecondaryScreen {...this.props} />);
        }
    }
}

function mapStateToProps(state: any) {
    const { products, account, purchase } = state;

    return {
        products,
        account,
        purchase
    };
}

const store = configureStore();
const AppWithState = connect(mapStateToProps)(App);

ReactDOM.render((
    <Provider store={store}>
        <AppWithState/>
    </Provider>
), document.getElementById("app"));
