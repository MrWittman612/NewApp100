import { TextField, withStyles } from '@material-ui/core';
import React from 'react';

const MyCustomTextField = withStyles({
  root: {
    '& .MuiInputLabel-formControl': {
      color: 'red',
    },
    '& .MuiInput-underline': {
      borderBottom: '1px solid blue',
    },
    '& .MuiInput-underline:after': {
      borderBottom: '4px solid blue',
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      position: 'absolute',
      transform: 'scaleX(-1)',
      transition:'transform 200ms cubic-bezier(0.4, 0, 0, 2.17) 0ms', 
      borderBottom: '4px solid blue',
    },
  },
})(TextField);

export default MyCustomTextField;

// import React from 'react';
// import { withStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';

// // The `withStyles()` higher-order component is injecting a `classes`
// // prop that is used by the `Button` component.
// const StyledButton = withStyles({
//   root: {
//     background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
//     borderRadius: 3,
//     border: 0,
//     color: 'white',
//     height: 48,
//     padding: '0 30px',
//     boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
//   },
//   label: {
//     textTransform: 'capitalize',
//   },
// })(Button);
