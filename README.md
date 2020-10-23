# pollen-scores

cron job to gather top 10 cred earners of past week.

.env variables are:
`MONGODB_URI` = URI with access to mongodb atlas instance
`CRON_SCHEDULER` = variable that sets schedule for cron job, in original cron format as explained here: https://www.digitalocean.com/community/tutorials/nodejs-cron-jobs-by-examples#step-2-%E2%80%94-building-the-backend-server-and-scheduling-a-task
