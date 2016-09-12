import { connect } from "react-redux";
import UsageStatsView from "components/UsageStatsView";

function mapStateToProps({stats}) {
    return { stats };
}

export default connect(mapStateToProps)(UsageStatsView);
