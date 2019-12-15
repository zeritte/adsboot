const base_url = "https://adsbot-api.herokuapp.com/dashboard/"; // production

const session = `${base_url}login`;
const registration = `${base_url}signup`;
const password = `${base_url}passwords`;
const getAllAds = `${base_url}getAds`;
const runRules = `${base_url}run`;

export default {
  base_url,
  session,
  registration,
  password,
  getAllAds,
  runRules,
};
