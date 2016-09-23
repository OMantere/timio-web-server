import React, { PropTypes } from 'react'
import { tabs } from 'lib/const';
import { Link } from 'react-router'
import classnames from 'classnames'

const NavBar = props => {
    const isActive = tab => tab.url === props.location.pathname;

    const getTabs = () => {
        return tabs.map((tab, key) => {
            return (
                <div className={classnames('nav-bar-tab', { 'active': isActive(tab) })} key={key}>
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