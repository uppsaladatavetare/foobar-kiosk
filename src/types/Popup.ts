export interface IPopup {
    component: React.ReactNode;
    blockInput?: boolean;
    autoCloseDelay?: number;
    closeWhen?: () => boolean;
    onClose?: () => void;
}

export class Popup implements IPopup {
    component: React.ReactNode;
    blockInput: boolean;
    autoCloseDelay?: number;
    closeWhen?: () => boolean;
    onClose?: () => void;

    constructor(popup: IPopup) {
        this.component = popup.component;
        this.blockInput = popup.blockInput || false;
        this.autoCloseDelay = popup.autoCloseDelay;
        this.closeWhen = popup.closeWhen;
        this.onClose = popup.onClose;
    }
}
