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

declare module "*.wav" {
    const src: string;
    export = src;
}

declare module "*.svg" {
    const src: string;
    export = src;
}
