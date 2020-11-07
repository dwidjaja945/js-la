import * as React from 'react';
import { cssBind } from '@toolkit/helper/cssUtils';

import styles from './Panel.scss';

const css = cssBind(styles);

export interface Props {
    children?: JSX.Element[];
    className?: string;
}

const Panel = (props: Props): JSX.Element => {
    const { children, className } = props;
    return (
        <div
            className={css('root', className)}
        >
            {children}
        </div>
    );
};

interface HeaderProps {
    children: JSX.Element | string;
}

const Header = (props: HeaderProps): JSX.Element => {
    const { children } = props;
    return (
        <div className={css('header')}>
            {children}
        </div>
    );
};

interface BodyProps {
    children: JSX.Element | string;
    className?: string;
}
const Body = (props: BodyProps): JSX.Element => {
    const { children, className } = props;
    return (
        <div className={css('body', className)}>
            {children}
        </div>
    );
};

interface FooterProps {
    children: JSX.Element | string;
}
const Footer = (props: FooterProps): JSX.Element => {
    const { children } = props;
    return (
        <div className={css('footer')}>
            {children}
        </div>
    );
};

Panel.Header = Header;
Panel.Body = Body;
Panel.Footer = Footer;
export default Panel;
