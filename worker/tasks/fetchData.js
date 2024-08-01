var fetch = require('node-fetch');
var redis = require("redis"),
    client = redis.createClient();

const {promisify} = require('util');
const setAsync = promisify(client.set).bind(client);


const baseURL = 'https://www.arbeitnow.com/api/job-board-api';

async function fetchData() {
    const { default: fetch } = await import('node-fetch');
    const res = await fetch(baseURL);
    const jobs = await res.json();
    // console.log({jobs});
    // console.log(jobs.length + 1);
    // console.log(jobs.data[0].slug);
    const jobArr = jobs.data;
    // console.log(jobArr.length);
    console.log(jobArr[0]);

    // slug
    // company_name
    // title
    // description
    // remote
    // url
    // tags
    // job_types
    // location
    // created_at

    // filter algo
    const jrJobs = jobArr.filter(job => {
        const jobTitle = job.title.toLowerCase();
        // algo logic
        if (
            jobTitle.includes('senior') ||
            jobTitle.includes('manager') ||
            jobTitle.includes('sr.') ||
            jobTitle.includes('architect') ||
            jobTitle.includes('hotel') ||
            jobTitle.includes('controller')
        ) {
            return false
        } 
        return true;
    })

    console.log('filtered down to', jrJobs.length);

    // set in redis
    const success = await setAsync('jobsKey', JSON.stringify(jrJobs));

    console.log({success});

}

fetchData();

module.exports = fetchData;
