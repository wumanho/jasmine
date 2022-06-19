export declare type CallBack = () => void;
declare type Events = {
    [key: string]: CallBack[];
};
export declare class Eventing {
    events: Events;
    on: (eventName: string, callback: CallBack) => void;
    trigger: (eventName: string) => void;
}
export {};
