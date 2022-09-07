import React from 'react';
import classes from './Backdrop.module.css';
import ReactDOM from "react-dom";

const backdropRoot = document.getElementById('backdrop-root');

// 蒙板组件
const Backdrop = (props) => {
    return ReactDOM.createPortal(<div
        {...props}
        className={`${classes.Backdrop} ${props.className}`}>
        {props.children}
    </div>, backdropRoot);
};

export default Backdrop;
