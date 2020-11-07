import * as React from 'react';
import { cssBind } from '@toolkit/helper/cssUtils';

import styles from '../Panel.scss';

const css = cssBind(styles);

interface Props {
    title?: string;
    footer?: JSX.Element;
    children: JSX.Element | string;
}

const OldPanel = (props: Props): JSX.Element => {
    const { title, children, footer } = props;
    return (
        <div className={css('root')}>
            <div className={css('title')}>
                {title}
            </div>
            {children}
            {footer}
        </div>
    );
};

export default OldPanel;
