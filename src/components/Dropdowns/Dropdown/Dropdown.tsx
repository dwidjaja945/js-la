import * as React from 'react';
import { cssBind } from '@toolkit/helper/cssUtils';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import styles from '../Dropdown.scss';

const css = cssBind(styles);

interface Props {
    onSelect(value?: unknown): void;
    children?: JSX.Element[];
}

const Dropdown = (props: Props): JSX.Element => {
    const { onSelect, children } = props;
    const [show, setShow] = React.useState(false);
    return (
        <div className={css('root')}>
            <ClickAwayListener
                onClickAway={(): void => setShow(false)}
            >
                <div>
                    <input
                        onFocus={(): void => setShow(true)}
                    />
                    <ul className={css('menu', show && 'show')}>
                        {React.Children.map(children, (child) => {
                            if (child) {
                                const childProps: ItemProps = child.props;
                                const { onClick, value } = childProps;
                                return React.cloneElement(child, {
                                    ...child.props,
                                    onClick: () => {
                                        onClick?.();
                                        onSelect(value);
                                        setShow(false);
                                    },
                                });
                            }
                            return null;
                        })}
                    </ul>
                </div>
            </ClickAwayListener>
        </div>
    );
};

interface ItemProps {
    children?: JSX.Element | string;
    onClick?: () => void;
    value?: unknown;
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
