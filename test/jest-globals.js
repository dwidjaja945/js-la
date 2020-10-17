global.NOOP = () => { };

/**
 * Addresses Jest error [TypeError: document.createRange is not a function] with PopperJS 
 * Reference: https://github.com/mui-org/material-ui/issues/15726
 * */

// global.document.createRange = () => ({
//     setStart: () => { },
//     setEnd: () => { },
//     commonAncestorContainer: {
//         nodeName: 'BODY',
//         ownerDocument: document,
//     },
// });