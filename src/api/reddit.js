export const API_ROOT = 'https://www.reddit.com';

export const getSubredditPosts = async ( data ) => {
  const { subreddit, sorting } = data
  const   response = await fetch(`${API_ROOT}${subreddit}${sorting}.json`);
  const   json     = await response.json();
  return  json.data.children.map((post) => post.data);
};

export const getPostComments = async (permalink) => {
  const response = await fetch(`${API_ROOT}${permalink}.json`);
  const json     = await response.json();

  return json[1].data.children.map((subreddit) => subreddit.data);
};

export const getSubreddits = async () => {
  const response = await fetch(`${API_ROOT}/subreddits.json`);
  const json     = await response.json();

  return json.data.children.map((subreddit) => subreddit.data);
};

export const getSearchResultes = async (term) => {
  const response = await fetch(`${API_ROOT}/search.json?q=${term}`);
  const json     = await response.json();

  return json.data.children.map((post) => post.data);
};