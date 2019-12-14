const base_url = "https://adsbot-api.herokuapp.com/dashboard/"; // production

const session = `${base_url}login`;
const registration = `${base_url}createUser`;
const password = `${base_url}passwords`;
const getAds = `${base_url}getAds`;
const runFilter = `${base_url}run`;

export default { base_url, session, registration, password, getAds, runFilter };
