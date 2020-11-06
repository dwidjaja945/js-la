import * as React from 'react';

import styles from './Panel.scss';

const Panel = (): JSX.Element => {
    console.log('panel rendered');
    return (
        <div
            className={styles.root}
        >
            panel
        </div>
    );
};

export default Panel;
