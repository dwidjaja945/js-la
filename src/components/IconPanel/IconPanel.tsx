import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import CodeIcon from '@material-ui/icons/Code';
import { makeStyles } from '@material-ui/core/styles';
import { cssBind } from '@toolkit/helper/cssUtils';

import styles from './IconPanel.scss';

const css = cssBind(styles);

const useStyles = makeStyles({
    root: {
        backgroundColor: 'transparent',
        borderWidth: '2px',
    },
});

export interface Props {
    icon?: JSX.Element;
    iconSize?: number;
    containerClassName?: string;
    className?: string;
}

const IconPanel: React.FC<Props> = (props) => {
    const classes = useStyles();
    const {
        icon = <CodeIcon />,
        iconSize = 48,
        containerClassName,
        className,
        children,
    } = props;
    const padding = `${iconSize / 2}px`;
    return (
        <div style={{ padding }} className={css('container', containerClassName)}>
            <Paper
                elevation={0}
                variant="outlined"
                classes={{
                    root: classes.root,
                }}
                style={{ padding }}
                className={css('border', className)}
            >
                <div
                    style={{ top: `-${iconSize / 2}px`, padding: `0 ${iconSize / 4}px` }}
                    className={css('iconContainer')}
                >
                    {React.cloneElement(
                        icon,
                        {
                            style: { width: `${iconSize}px`, height: `${iconSize}px` },
                        },
                    )}
                </div>
                {children}
            </Paper>
        </div>
    );
};

export default IconPanel;
