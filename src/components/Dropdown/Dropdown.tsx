import * as React from 'react';
import { cssBind } from '@toolkit/helper/cssUtils';

import styles from './Dropdown.scss';

const css = cssBind(styles);

interface Props {
    children?: JSX.Element[];
}

const Dropdown = (props: Props): JSX.Element => {
    const { children } = props;
    const [show, setShow] = React.useState(false);
    return (
        <div className={css('root')}>
            <input
                onFocus={(): void => setShow(true)}
            />
            <ul className={css('menu', show && 'show')}>
                {React.Children.map(children, (child) => {
                    if (child) {
                        const { props: { onClick } } = child;
                        return React.cloneElement(child, {
                            ...child.props,
                            onClick: () => {
                                onClick?.();
                                setShow(false);
                            },
                        });
                    }
                    return null;
                })}
            </ul>
        </div>
    );
};

interface ItemProps {
    children?: JSX.Element | string;
    onClick?: () => void;
}

const Item = (props: ItemProps): JSX.Element => {
    const { onClick, children } = props;
    return (
        <button type="button" role="menuitem" onClick={onClick}>
            {children}
        </button>
    );
};

Dropdown.Item = Item;
export default Dropdown;
