const base_url = "https://adsbotapi.herokuapp.com/api/"; // production

const session = `${base_url}token`;
const registration = `${base_url}user`;
const password = `${base_url}passwords`;
const clientTokens = `${base_url}client-token`;
const projects = `${base_url}projects`;
const projectParams = projectId =>
  `${base_url}projects/${projectId}/rule-parameters`;
const allAds = projectId => `${base_url}projects/${projectId}/ads`;
const adgroups = projectId => `${base_url}projects/${projectId}/adgroups`;
const campaigns = projectId => `${base_url}projects/${projectId}/campaigns`;
const runRules = projectId => `${base_url}projects/${projectId}/reports`;

export default {
  base_url,
  session,
  registration,
  password,
  clientTokens,
  projects,
  projectParams,
  allAds,
  adgroups,
  campaigns,
  runRules,
};
