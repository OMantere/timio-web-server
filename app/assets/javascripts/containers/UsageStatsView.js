import { connect } from "react-redux";
import UsageStatsView from "components/UsageStatsView";
import { fetchUserData } from 'actions/api'

function mapStateToProps({ stats, usages, errors }) {
    return { stats, usages, errors };
}

export default connect(mapStateToProps, { fetchUserData })(UsageStatsView);
