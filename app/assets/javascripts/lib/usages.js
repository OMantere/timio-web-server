import _ from 'lodash'
import moment from 'moment'

export const processUsages = usages => {
    let groupCount = 0;
    const groups = _.mapValues(usages, () => ++groupCount);
    const items = [];
    _.each(usages, array => {
        items.push.apply(items, array.map(usage => {
            return {
                ...usage,
                start_time: moment(usage.start).unix()*1000,
                end_time: moment(usage.end).unix()*1000,
                title: usage.name,
                group: groups[usage.device],
                canMove: false,
                canResize: false,
                canChangeGroup: false
            }
        }))
    });

    return {
        items,
        groups: _.map(groups, (id, title) => {
            return { title: deviceDisplayTitle.get(title), id };
        })
    }
};

const deviceDisplayTitle = new Map();
deviceDisplayTitle.set('android', 'Android');
deviceDisplayTitle.set('osx', 'Mac');
