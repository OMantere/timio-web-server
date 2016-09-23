import React, { PropTypes } from 'react'

const ClientsCTA = props => {
    const getAndroidCTA = () => {
        //if(props.stats.every(stat => stat.android_seconds === 0))
            return (
                <div className="android-client">
                    <i className="fa fa-mobile fa-3x" aria-hidden="true"></i>
                    <div className="text">
                        <p>It seems like you don't have any Android data on Timio yet.</p>
                        <a href="#">Download the Android client from the Google Play store</a>
                    </div>
                </div>

            );
        //else
            //return null;
    };

    return (
        <div className="clients">
            {getAndroidCTA()}
        </div>
    )
};

ClientsCTA.propTypes = {
    stats: PropTypes.array.isRequired
};

export default ClientsCTA;