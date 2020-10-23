## pollen-scores

Cron job to gather top 10 cred earners of past week and save to Mongodb atlas instance.

## Quick start

- `npm run dev` will launch the script locally with hot loading included
- `start` will launch the script without hot reloading

### config

For the script to run properly, it needs these variables, laid out in the `.env.sample` file:
- `MONGODB_URI` your Mongodb Atlas instance URI
- `CRON_SCHEDULER` a variable that sets the schedule for the cron job, in original cron format as explained [here](https://www.digitalocean.com/community/tutorials/nodejs-cron-jobs-by-examples#step-2-%E2%80%94-building-the-backend-server-and-scheduling-a-task)
