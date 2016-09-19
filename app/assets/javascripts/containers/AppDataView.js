import { connect } from "react-redux";
import AppDataView from "components/AppDataView";
import { fetchUserData } from 'actions/api'

function mapStateToProps({ stats, usages, errors }) {
    return { stats, usages, errors };
}

export default connect(mapStateToProps, { fetchUserData })(AppDataView);
