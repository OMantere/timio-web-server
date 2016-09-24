import moment from 'moment'

export default class TimioStats {
    constructor() {
        this._stats = {
            totals: {},
            weeks: Array(52).fill().map(() => {
                return {
                    totals: {},
                    days: Array(7).fill().map(() => {
                        return {
                            totals: {},
                            usages: []
                        }
                    })
                }
            })
        };
    }

    addTotal(totals, device, amount) {
        if(totals[device])
            totals[device] += amount;
        else
            totals[device] = amount;
    }
    
    addFullDay(usage, week, dayNumber) {
        const day = week.days[dayNumber];
        const dayUsage = {
            name: usage.name,
            device: usage.device,
            start_time: 0,
            end_time: moment.duration(1, 'days').valueOf()
        };
        day.usages.push(dayUsage);
        this.addTotal(day.totals, usage.name, moment.duration(1, 'days').valueOf());
    }

    addFullWeek(usage, weekNumber) {
        const week = this._stats[weekNumber];
        this.addTotal(week.totals, usage.name, moment.duration(1, 'weeks').valueOf());
        week.days.forEach((day, dayNumber) => {
            this.addFullDay(usage, week, dayNumber);
        })
    }
    
    addDay(usage, week, dayNumber, start, end) {
        const day = week.days[dayNumber];
        const startOfDay = moment(start).startOf('isoDay').valueOf();
        const dayUsage = {
            name: usage.name,
            device: usage.device,
            start_time: start - startOfDay,
            end_time: end - startOfDay
        };
        day.usages.push(dayUsage);
        this.addTotal(day.totals, usage.name, end - start);
    }
    
    addWeek(usage, weekNumber, start, end) {
        const startDay = moment(start).day();
        const endDay = moment(end).day();
        const week = this._stats.weeks[weekNumber];

        if(startDay != endDay) {
            const firstEnd = moment(start).add(1, 'days').startOf('isoDay').valueOf();
            const lastStart = moment(end).startOf('isoDay').valueOf();
            this.addDay(usage, week, startDay, start, firstEnd);
            this.addDay(usage, week, endDay, lastStart, end);

            if(endDay - startDay > 1) {
                for(let i = startDay; i < endDay - 1; i++) {
                    this.addFullDay(usage, week, i + 1);
                }
            }
        } else {
            this.addDay(usage, week, startDay, start, end);
        }
    }

    add(usage) {
        // Filter usages that are over a year old for now
        if(moment().diff(moment(usage.startTime), 'years') >= 1)
            return false;

        const startWeek = moment(usage.start).week();
        const endWeek = moment(usage.end).week();

        if(startWeek != endWeek) {
            const firstEnd = moment(usage.start).add(1, 'weeks').startOf('isoWeek').valueOf();
            const lastStart = moment(usage.end).startOf('isoWeek').valueOf();
            this.addWeek(usage, startWeek, usage.start, firstEnd);
            this.addWeek(usage, endWeek, lastStart, usage.end);

            for(let i = startWeek; i < endWeek - 1; i++) {
                const start = moment(usage.start).add(i + 1, 'weeks').startOf('isoWeek').valueOf();
                this.addFullWeek(usage, i + 1, start);
            }
        } else {
            this.addWeek(usage, startWeek, usage.start_time, usage.end_time);
        }

        return true;
    }

    getWeek(weekNumber) {
        const week = this._stats.weeks[weekNumber];
        return {
            ...week,
            getDay: this._getDay.bind(week)
        };
    }

    /**
     * This should not be called directly
     */
    _getHourly() {
        const hourMillis = 3600000;
        const hours = Array(24).fill().map(() => {
            return { android: 0, osx: 0 }
        });
        const addUsage = (usage, hour, time) => {
            hours[hour] = _.map(hours[hour], deviceTime => deviceTime + time);
        };
        
        if (!this.usages)
            throw new Error('Only to be called on a day object!');

        this.usages.map(usage => {
            const startHour = Math.floor(usage.start_time / hourMillis);
            const endHour = Math.floor(usage.end_time / hourMillis);
            
            if(startHour != endHour) {
                addUsage(usage, startHour, endHour*hourMillis - usage.start_time);
                addUsage(usage, endHour, usage.end_time - startHour*hourMillis);
                
                for(let i = startHour; i < endHour - 1; i++) {
                    addUsage(usage, startHour + 1, hourMillis);
                }
            } else {
                addUsage(usage, startHour, usage.end_time - usage.start_time);
            }
        })
    }

    /**
     * This should not be called directly
     */
    _getDay(dayNumber) {
        if(!this.days)
            throw new Error('Only to be called on a week object!');

        const day = this.days[dayNumber];
        return {
            ...day,
            getHourly: this._getHourly.bind(day)
        }
    }
}