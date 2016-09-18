import { connect } from "react-redux";
import UsageStatsView from "components/UsageStatsView";

function mapStateToProps({ stats, usages }) {
    return { stats, usages };
}

export default connect(mapStateToProps)(UsageStatsView);
