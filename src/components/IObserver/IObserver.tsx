import * as React from 'react';

const noop = (): void => {};

const defaultOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0,
};

interface ObserverItemProps {
    children: JSX.Element;
    data?: unknown;
}

interface ObserverContext {
    observe(node: HTMLElement | null, data: unknown): void;
    unobserve(node: HTMLElement | null): void;
}

const IObserverContext = React.createContext<ObserverContext>({ observe: noop, unobserve: noop });

export const ObserverItem = (props: ObserverItemProps): JSX.Element | null => {
    const { observe, unobserve } = React.useContext(IObserverContext);
    const element = React.useRef<HTMLDivElement | null>(null);
    const child = React.Children.only(props.children);

    React.useEffect(() => {
        if (element.current) observe(element.current, props.data ?? element.current);
        return (): void => {
            unobserve(element.current);
        };
    }, []);

    return (
        <>
            <div ref={element} />
            {child}
        </>
    );
};

interface Props {
    handleIntersect(items: [IntersectionObserverEntry, unknown][]): void;
    options?: IntersectionObserverInit;
    children: JSX.Element[];
}

function IObserver(props: Props): JSX.Element {
    const { handleIntersect, options, children } = props;

    const dataRef = React.useRef<Map<Element, unknown>>(new Map());
    const intersect = (entries: IntersectionObserverEntry[]): void => {
        const visibleItems: [IntersectionObserverEntry, unknown][] = [];
        entries.forEach((entry) => {
            const data = dataRef.current.get(entry.target);
            if (data) visibleItems.push([entry, data]);
        });
        return handleIntersect(visibleItems);
    };

    const intersectRef = React.useRef<typeof intersect>(intersect);
    React.useEffect(() => {
        intersectRef.current = intersect;
    });

    const createObserver = (): IntersectionObserver => {
        const cb = (entries: IntersectionObserverEntry[]): void => intersectRef.current(entries);
        return new IntersectionObserver(cb, { ...defaultOptions, ...options });
    };

    const Observer = React.useRef<IntersectionObserver | null>(null);
    if (Observer.current === null) {
        Observer.current = createObserver();
    }

    const observe = React.useCallback((node: HTMLElement | null, data?: unknown): void => {
        if (node) {
            dataRef.current.set(node, data ?? node);
            if (Observer.current) Observer.current.observe(node);
        }
    }, []);

    const unobserve = React.useCallback((node: Element | null): void => {
        if (node && Observer.current) Observer.current.unobserve(node);
    }, []);

    const contextValue = React.useMemo(() => ({ observe, unobserve }), [observe, unobserve]);

    React.useEffect(() => (): void => {
        Array(...dataRef.current.keys()).forEach((node) => {
            unobserve(node);
        });
    }, []);

    return (
        <IObserverContext.Provider value={contextValue}>
            {children}
        </IObserverContext.Provider>
    );
}

export default IObserver;
