import * as React from 'react';

import { cssBind, cssBind } from '@toolkit/helper/cssUtils';
import Panel from '@components/Panel';
import OldPanel from '@components/Panel/OldPanel/OldPanel';
import IconPanel from '@components/IconPanel';

import styles from './App.scss';

const css = cssBind(styles);

const App = (): JSX.Element => (
    <div className={css('root')}>
        Hello, Hackbuddies!
        <div className={css('panels')}>
            <OldPanel
                title="Header"
                footer="Footer"
            >
                Body
            </OldPanel>
            {/* <Panel>
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
            <Panel /> */}
        </div>
    </div>
);

export default App;
