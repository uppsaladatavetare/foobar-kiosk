// Type definitions for reflexbox
// Project: https://github.com/jxnblk/reflexbox
// Definitions by: Per Bergqwist <https://github.com/normano64>>

declare module "reflexbox" {
    export import Box = __Reflexbox.Box;
    export import Flex = __Reflexbox.Flex;
}

declare namespace __Reflexbox {
    interface Props {
        auto?: boolean;
        className?: string;
        is?: string | Object | Function;
        key?: string | number;
        lg?: boolean;
        m?: number;
        md?: boolean;
        mx?: number;
        my?: number;
        mt?: number;
        mb?: number;
        ml?: number;
        mr?: number;
        onClick?: Function;
        p?: number;
        px?: number;
        py?: number;
        pt?: number;
        pb?: number;
        pl?: number;
        pr?: number;
        sm?: boolean;
        style?: React.CSSProperties;
    }

    interface BoxProps extends Props {
        align?: "stretch" | "center" | "baseline" | "flex-start" | "flex-end";
        col?: number;
        flex?: boolean;
        order?: number;
    }

    export class Box extends React.Component<BoxProps> { }

    interface FlexProps extends Props {
        align?: "stretch" | "center" | "baseline" | "flex-start" | "flex-end";
        column?: boolean;
        flex?: boolean;
        gutter?: number;
        justify?: "center" | "space-around" | "space-between" | "flex-start" | "flex-end";
        order?: number;
        wrap?: boolean;
    }

    export class Flex extends React.Component<FlexProps> { }
}

declare module "reflexbox/Box" {
    export import Box = __Reflexbox.Box;
    export default Box;
}

declare module "reflexbox/Flex" {
    export import Flex = __Reflexbox.Flex;
    export default Flex;
}
