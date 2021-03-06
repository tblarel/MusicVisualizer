import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import Splash from './splash';

const mapStateToProps = ({ errors }) => {
    return {
        errors: errors,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Splash);
