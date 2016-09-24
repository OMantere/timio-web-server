import { connect } from "react-redux";

function mapStateToProps({ user, data, errors }) {
    return { user, usages: data.usages, stats: data.stats, errors };
}

export default connect(mapStateToProps)
