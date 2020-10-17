export const makeCancelable = <T>(promise: Promise<T>): MakeCancelable<T> => {
    let wasCancelled = false;
    let isPending = true;
    const wrappedPromise = new Promise<T>((resolve, reject): void => {
        promise.then(
            (val) => {
                isPending = false;
                // eslint-disable-next-line
                return wasCancelled ? reject({ isCanceled: true }) : resolve(val);
            },
            (error) => {
                isPending = false;
                // eslint-disable-next-line
                return wasCancelled ? reject({ isCanceled: true }) : reject(error);
            },
        );
    });

    return {
        promise: wrappedPromise,
        cancel(): void {
            wasCancelled = true;
        },
        isPending(): boolean {
            return isPending;
        },
    };
};
