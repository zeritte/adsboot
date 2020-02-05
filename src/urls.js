const base_url = "https://adsbotapi.herokuapp.com/api/"; // production

const session = `${base_url}token`;
const registration = `${base_url}user`;
const password = `${base_url}passwords`;
const clientTokens = `${base_url}client-token`;
const projects = `${base_url}projects`;
const projectParams = projectId => `${base_url}projects/${projectId}/rule-parameters`;
const getAllAds = `${base_url}getAds`;
const runRules = `${base_url}run`;

export default {
  base_url,
  session,
  registration,
  password,
  clientTokens,
  projects,
  projectParams,
  getAllAds,
  runRules,
};
