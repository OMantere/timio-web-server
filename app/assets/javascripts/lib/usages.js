import _ from 'lodash'
import moment from 'moment'

export const processUsages = usages => {
    let groupCount = 1;
    const groups = {};
    const items = _.mapValues(usages, array => {
        return array.map(usage => {
            if(!groups[usage.name]) {
                groups[usage.name] = groupCount;
                groupCount++;
            }
            return {
                ...usage,
                start_time: moment(usage.start).unix(),
                end_time: moment(usage.end).unix(),
                title: usage.name,
                group: groups[usage.name]
            }
        })
    });

    return {
        items,
        groups: _.map(groups, (id, title) => {
            return { title, id };
        })
    }
};
