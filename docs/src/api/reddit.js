export const API_ROOT = 'https://www.reddit.com';

export const getSubredditPosts  = async ( data ) => {
  const  { subreddit, sorting } =         data
  const    response = await fetch(`${API_ROOT}${subreddit}${sorting}.json`);
  const    json     = await response.json();
  const    nextPost = json.data.after;
  const    posts    = json.data.children.map((post) => post.data);
  return { nextPost, posts }
};

export const getMoreSubredditPosts          = async ( data ) => {
  const  { subreddit, sorting, nextPostId } =         data
  const    response = await fetch(`${API_ROOT}${subreddit}${sorting}.json?after=${nextPostId}`);
  const    json     = await response.json();
  const    nextPost = json.data.after;
  const    posts    = json.data.children.map((post) => post.data);
  return { nextPost, posts }
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

export const getSearchResultes     = async (data) => {
  const  { subreddit, searchTerm } = data;
  const    response = await fetch(`${API_ROOT}/${subreddit}search.json?q=${searchTerm}&restrict_sr=on`);
  const    json     = await response.json();
  const    nextPost = json.data.after;
  const    posts    = json.data.children.map((post) => post.data);
  return { nextPost, posts };
};

export const getMoreSearchResultes            = async (data) => {
  const { subreddit, searchTerm, nextPostId } =        data;
  const    response = await fetch(`${API_ROOT}/${subreddit}search.json?q=${searchTerm}&after=${nextPostId}&restrict_sr=on`);
  const    json     = await response.json();
  const    nextPost = json.data.after;
  const    posts    = json.data.children.map((post) => post.data);
  return { nextPost, posts };
};