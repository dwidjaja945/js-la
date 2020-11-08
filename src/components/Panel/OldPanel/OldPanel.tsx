import * as React from 'react';
import { cssBind } from '@toolkit/helper/cssUtils';

import styles from '../Panel.scss';
import oldPanelStyles from './OldPanel.scss';

const css = cssBind(styles);

interface Props {
    title?: string;
    footer?: JSX.Element | string;
    children: JSX.Element | string;
}

const OldPanel = (props: Props): JSX.Element => {
    const { title, children, footer } = props;
    return (
        <div className={css('root')}>
            <header className={css('header')}>
                {title}
            </header>
            <div className={oldPanelStyles.body}>
                {children}
            </div>
            <footer className={oldPanelStyles.footer}>
                {footer}
            </footer>
        </div>
    );
};

export default OldPanel;
