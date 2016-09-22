import { connect } from 'react-redux'
import App from 'components/App'
import { fetchUserData } from 'actions/api'

const mapStateToProps = ({ user }) => {
    return { user };
};

export default connect(mapStateToProps, { fetchUserData })(App);
