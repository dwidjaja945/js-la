import { isObject, pickBy, reduce } from 'lodash';

type CssClasses = (string | undefined | false)[]

const emptyArray: string[] | never[] = [];

export const createClassString = (...classes: CssClasses): string =>
    classes
        .filter((className): className is string => typeof className === 'string')
        .reduce((prev, cur: string): string[] => {
            if (cur) {
                return [...prev, ...cur.split(' ').filter((str: string) => str)];
            }
            return [...prev];
        }, emptyArray)
        .join(' ');

export const cssBind = (styles: Styles.Css) =>
    (...classNames: CssClasses): string => {
        const classes = classNames.map((name): (string | undefined) => {
            if (typeof name === 'string') {
                return name.split(' ').map(nestedClass => {
                    if (styles[nestedClass]) return styles[nestedClass];
                    return nestedClass;
                }).join(' ');
            }
            if (isObject(name)) {
                const trimmedObject = pickBy(name, value => value === true);
                return reduce(trimmedObject, (result, value, key) => `${result} ${styles[key]}`, '');
            }
            return undefined;
        });
        return createClassString(...classes);
    };
