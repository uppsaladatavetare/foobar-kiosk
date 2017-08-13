declare const __DEV__: boolean;
declare const Thunder: {
    connect: (host: string, apikey: string, channels: string[], options?: object) => void;
    listen: (
        handler: (data: { channel: string, payload: string }) => void
    ) => void;
};

declare const config: {
    API: {
        host: string;
        key: string;
    };
    THUNDER: {
        host: string;
        key: string;
        secret: string;
    };
    SENTRY?: string;
    SCREEN: "primary" | "secondary";
};

declare module "*.scss" {
    interface IClassNames {
        [className: string]: string;
    }
    const classNames: IClassNames;
    export = classNames;
}

// Fix until react-transition-group and @types/react-transition-group match their exports
declare module "react-transition-group" {
    import * as InternalTransitionGroup from "react-transition-group/TransitionGroup";
    import * as InternalCSSTransition from "react-transition-group/CSSTransition";

    class TransitionGroup extends React.Component<InternalTransitionGroup.TransitionGroupProps> {}
    class CSSTransition extends React.Component<InternalCSSTransition.CSSTransitionProps> {}

    export {
        TransitionGroup,
        CSSTransition
    };
}
