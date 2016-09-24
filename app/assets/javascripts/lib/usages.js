import _ from 'lodash'
import moment from 'moment'
import TimioStats from 'lib/TimioStats'

export const processUsages = usages => {
    console.log(usages)

    let groupCount = 0;
    const groups = _.mapValues(usages, () => ++groupCount);
    const items = [];
    const stats = {};
    _.each(usages, array => {
        items.push.apply(items, array.map(usage => {
            if(!stats[usage.name])
                stats[usage.name] = new TimioStats();
            const processed = {
                ...usage,
                start_time: moment(usage.start).unix()*1000,
                end_time: moment(usage.end).unix()*1000,
                title: usage.name,
                group: groups[usage.device],
                canMove: false,
                canResize: false,
                canChangeGroup: false
            };
            stats[usage.name].add(processed);
            return processed;
        }))
    });

    const processedUsages = {
        items,
        groups: _.map(groups, (id, title) => {
            return { title: deviceDisplayTitle.get(title), id };
        })
    };

    return {
        usages: processedUsages,
        stats
    }
};

const deviceDisplayTitle = new Map();
deviceDisplayTitle.set('android', 'Android');
deviceDisplayTitle.set('osx', 'Mac');
