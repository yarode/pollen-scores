const { EnvironmentError } = require('./error-utils')

// Structure:
// [environmentVariable, default, required?]
const ENV_VARS = {
  MONGODB_URI: [
    process.env.MONGODB_URI,
    'YOUR_URI_HERE',
    true,
  ],
  CRON_SCHEDULER: [
    process.env.CRON_SCHEDULER,
    'CRON_SCHEDULER_HERE',
    true,
  ]
}

function environment(name) {
  const envVar = ENV_VARS[name]
  if (!envVar) {
    return null
  }
  // If the environment variable is required and has not been properly set,
  // throw an error.
  if (envVar === ENV_VARS[name][1] && ENV_VARS[name][2]) {
    throw new EnvironmentError(
      `The environment variable with name ${name} has not been set properly. Please edit it on the heroku config vars.`,
    )
  }

  return envVar[0] === undefined ? envVar[1] : envVar[0].trim()
}

module.exports = { environment }
