import superagent from 'superagent';

const getCurrentEnrollment = (config, user, successCallback, failCallback) => {
  const url = `${config.api.url}/api/contacts/${user.contactId}/enrollments/current`;
  return superagent
    .get(url)
    .withCredentials()
    .end((err, response) => {
      if (err) {
        failCallback(err);
      }
      successCallback(response);
    });
}

module.exports = { getCurrentEnrollment };
