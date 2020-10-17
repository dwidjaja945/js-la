declare interface MakeCancelable<T> {
    cancel: () => void;
    promise: Promise<T>;
    isPending: () => boolean;
}
