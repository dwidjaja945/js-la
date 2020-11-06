import * as React from 'react';
import { cssBind } from '@toolkit/helper/cssUtils';

import styles from '../Dropdown/Dropdown.scss';

const css = cssBind(styles);

export interface DropdownItem {
    id: number;
    text: string;
    onClick(): void;
}

interface Props {
    items: DropdownItem[];
}

const OldDropdown = (props: Props): JSX.Element => {
    const { items } = props;
    const [show, setShow] = React.useState(false);
    return (
        <div className={css('root')}>
            <input
                onFocus={(): void => setShow(true)}
            />
            <ul className={css('menu', show && 'show')} role="menu">
                {items.map((item): JSX.Element => (
                    <button
                        key={item.id}
                        type="button"
                        onClick={(): void => {
                            item.onClick();
                            setShow(false);
                        }}
                        role="menuitem"
                    >
                        {item.text}
                    </button>
                ))}
            </ul>
        </div>
    );
};

export default OldDropdown;
