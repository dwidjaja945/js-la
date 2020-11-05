import React, { Suspense, lazy } from 'react';

import Dropdown from '@components/Dropdown';
import OldDropdown, { DropdownItem } from '@components/OldDropdown';

const dropdownItems: DropdownItem[] = [
    {
        id: 0,
        text: 'hello',
        onClick: () => console.log('hello'),
    },
    {
        id: 1,
        text: 'world',
        onClick: () => console.log('world'),
    },
    {
        id: 2,
        text: 'foo',
        onClick: () => console.log('foo'),
    },
    {
        id: 3,
        text: 'bar',
        onClick: () => console.log('bar'),
    },
];

const App = (): JSX.Element => (
    <div style={{ padding: '30px' }}>
        Hello, World!
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <Dropdown>
                <Dropdown.Item>
                    hello
                </Dropdown.Item>
                <Dropdown.Item>
                    world
                </Dropdown.Item>
                <Dropdown.Item>
                    foo
                </Dropdown.Item>
                <Dropdown.Item>
                    bar
                </Dropdown.Item>
            </Dropdown>
            <OldDropdown items={dropdownItems} />
        </div>
    </div>
);

export default App;
