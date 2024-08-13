'use strict';
const ActiveDirectory = require('activedirectory2').promiseWrapper;
const customParser = (entry, raw, callback) => {
  if (raw.hasOwnProperty('thumbnailPhoto')) {
    entry.thumbnailPhoto = raw.thumbnailPhoto
  }
  callback(entry)
}
const config = {
  url: process.env.LDAPS_CONNECTION_URL,
  secure: true,
  username: process.env.LDAPS_USER_NAME,
  password: process.env.LDAPS_PASSWORD,
  baseDN: process.env.LDAPS_BASE_DN,
  tlsOptions: {
    rejectUnauthorized: false
  },
  referrals: {
    enabled: true,
  },
  attributes: {
    user: ['displayName', 'employeeID', 'mail', 'mobile', 'title',
      'designation', 'department', 'company', 'telephoneNumber', 'streetAddress',
      'city', 'state', 'postalCode', 'country', 'userAccountControl'],
  },
  entryParser: customParser

}
const ad = new ActiveDirectory(config);

exports.fetchUserByEmail = async (email) => {
  const filter = `mail=${email}`;
  try {
    const user = await ad.findUsers(filter)
    if (user?.length) {
      return user[0]
    }
    return
  } catch (e) {
    console.log(e)
    throw (e)
  }

};

exports.fetchUserByEmailWithRetry = async (email, maxRetries = 2) => {
  let retries = 0;
  let user = null;
  while (retries < maxRetries) {
    try {
      user = await ad.findUsers(`mail=${email}`);

      if (user?.length) {
        // Data found, break out of the loop
        return user[0];
      } else {
        // No data found, increment retry count and wait before retrying
        retries++;
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second before retrying
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      retries++;
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second before retrying
    }
  }

  // If no data is found after all retries, return null
  return null;
};

exports.authenticate = (username, password) => {
  return new Promise((resolve, reject) => {
    ad.authenticate(username, password, (err, auth) => {
      if (err) {
        console.log('ERROR: ' + JSON.stringify(err));
        return reject(err);
      }

      if (auth) {
        console.log('Authenticated!');
        return resolve(true);
      } else {
        console.log('Authentication failed!');
        return resolve(false);
      }
    });
  });
}
