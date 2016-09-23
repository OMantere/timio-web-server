import React, { PropTypes } from 'react'
import { tabs } from 'lib/const';
import { Link } from 'react-router'

const NavBar = props => {
    const getTabs = () => {
        return tabs.map(tab => {
            return (
                <div className="nav-bar-tab">
                    <Link to={tab.url}>{tab.title}</Link>
                </div>
            )
        })
    };

    return (
        <div className="nav-bar">
            {getTabs()}
        </div>
    )
};

export default NavBar;