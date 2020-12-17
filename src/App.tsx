import * as React from 'react';

import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import AdjustIcon from '@material-ui/icons/Adjust';

import Dropdown from '@components/Dropdowns/Dropdown/index';
import OldDropdown, { DropdownItem } from '@components/Dropdowns/OldDropdown';
import Panel from '@components/Panel';
import OldPanel from '@components/Panel/OldPanel/OldPanel';
import IconPanel from '@components/IconPanel';

import { cssBind } from '@toolkit/helper/cssUtils';

import styles from './App.scss';

const css = cssBind(styles);

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

const App = (): JSX.Element => {
    const [dropdownValue, setDropdownValue] = React.useState<undefined | string>();

    const handleSelect = (item?: string): void => {
        console.log(item);
        setDropdownValue(item);
    };

    return (
        <div className={css('root')}>
            Hello, Hackbuddies!
            <div className={css('dropdowns')}>
                <Dropdown onSelect={handleSelect} value={dropdownValue}>
                    <Dropdown.Item
                        onClick={(): void => handleSelect('hello')}
                    >
                        hello
                    </Dropdown.Item>
                    <Dropdown.Item value="world">
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
            <div className={css('panels')}>
                <OldPanel
                    title="Header"
                    footer="Footer"
                >
                    Body
                </OldPanel>
                <Panel>
                    <Panel.Header>
                        Header
                    </Panel.Header>
                    <Panel.Body className={css('body')}>
                        Body
                    </Panel.Body>
                    <Panel.Header>
                        Header
                    </Panel.Header>
                    <Panel.Body className={css('body')}>
                        Body
                    </Panel.Body>
                    <Panel.Footer>
                        Footer
                    </Panel.Footer>
                </Panel>
                <Panel />
            </div>
            <div className={css('iconPanel')}>
                <IconPanel
                    containerClassName={css('panelContainer')}
                    className={css('panel')}
                >
                    Custom Content Goes in here
                </IconPanel>
                <IconPanel
                    icon={<AccessibilityNewIcon />}
                    containerClassName={css('panelContainer')}
                    className={css('panel')}
                >
                    <h1>Can literally be anything</h1>
                </IconPanel>
                <IconPanel
                    icon={<AdjustIcon />}
                    containerClassName={css('panelContainer')}
                    className={css('panel')}
                >
                    <h6>Can control styling for panel directly where it&apos;s used</h6>
                </IconPanel>
            </div>
        </div>
    );
};

export default App;
