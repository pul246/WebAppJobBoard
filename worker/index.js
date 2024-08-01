var CronJob = require('cron').CronJob;

const fetchData = require('./tasks/fetchData')

// fetch the jobs
new CronJob('* * * * *', fetchData, null, true, 'America/Los_Angeles');