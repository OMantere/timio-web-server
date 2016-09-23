import { connect } from "react-redux";

function mapStateToProps({ user, stats, usages, errors }) {
    return { user, stats, usages, errors };
}

export default connect(mapStateToProps)
