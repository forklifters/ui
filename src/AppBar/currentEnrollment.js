import superagent from 'superagent';

const getCurrentEnrollment = (config, user, successCallback, failCallback) => {
  const contactId = user.contactId || user.contact_id;
  if (contactId === undefined) {
    return;
  }

  const url = `${config.api.url}/api/contacts/${contactId}/enrollments/current`;
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
