import _ from 'lodash'
import moment from 'moment'

export const processUsages = usages => {
    let groupCount = 0;
    const groups = _.mapValues(usages, () => ++groupCount);
    const items = [];
    _.each(usages, array => {
        items.push.apply(items, array.map(usage => {
            console.log('Datetimes', usage.start, usage.end)
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

    console.log({
        items,
        groups: _.map(groups, (id, title) => {
            return { title, id };
        })
    })

    console.log(items.sort((a, b) => a.start > b.start ? 1 : -1))

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
