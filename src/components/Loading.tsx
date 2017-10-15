import * as React from "react";
import { style, classes, keyframes } from "typestyle";
import { white, black } from "common/styling";

const loadingAnimation = keyframes({
    "0%, 40%, 100%": {
        transform: "scaleY(0.4)"
    },
    "20%": {
        transform: "scaleY(1.0)"
    }
});

const classNames = {
    bar: style({
        background: white,
        height: 50,
        width: 8,
        display: "inline-block",
        margin: "0 2px",
        animationName: loadingAnimation,
        animationDuration: "1.2s",
        animationIterationCount: "infinite",
        animationTimingFunction: "ease-in-out",
        verticalAlign: "middle"
    }),
    invertedBar: style({
        background: black
    }),
    delay2: style({
        animationDelay: "-1.1s"
    }),
    delay3: style({
        animationDelay: "-1.0s"
    }),
    delay4: style({
        animationDelay: "-0.9s"
    }),
    delay5: style({
        animationDelay: "-0.8s"
    })
};

interface ILoadingBoxProps {
    inverted?: boolean;
    className?: string;
}

export class Loading extends React.Component<ILoadingBoxProps> {
    render() {
        const { inverted, className } = this.props;

        const barClassNames = classes(classNames.bar, inverted && classNames.invertedBar);

        return (
            <div className={className}>
                <div className={barClassNames}/>
                <div className={classes(barClassNames, classNames.delay2)}/>
                <div className={classes(barClassNames, classNames.delay3)}/>
                <div className={classes(barClassNames, classNames.delay4)}/>
                <div className={classes(barClassNames, classNames.delay5)}/>
            </div>
        );
    }
}
