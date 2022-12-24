import React, { useState, useEffect, useContext } from "react";
import defaultUser from "./mockData.js/defaultUser";
import mockRepos from "./mockData.js/defaultRepos";
import mockFollowers from "./mockData.js/defaultFollowers";
import axios from "axios";

const rootUrl = "https://api.github.com";

const GithubContext = React.createContext();
const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(defaultUser);
  const [repo, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);

  const [requests, setRequests] = useState(0);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState({ show: false, msg: "" });

  const searchGithubUser = async (user) => {
    toggleError();
    setLoading(true);
    const response = await axios(`${rootUrl}/users/${user}`).catch((error) =>
      console.log(error)
    );

    if (response) {
      setGithubUser(response.data);
      const { login, followers_url } = response.data;
      await Promise.allSettled([
        axios(`${rootUrl}/users/${login}/repos?per_page=100`),
        axios(`${followers_url}?per_page=100`),
      ])
        .then((result) => {
          const [repo, followers] = result;
          if (repo.status === "fulfilled") {
            setRepos(repo.value.data);
          }
          if (followers.status === "fulfilled") {
            setFollowers(followers.value.data);
          }
        })
        .catch((error) => console.log(error));
    } else {
      setError({ show: true, msg: "there is no user with that username" });
    }
    getRequests();
    setLoading(false);
  };

  const getRequests = async () => {
    try {
      const { data } = await axios.get(`${rootUrl}/rate_limit`);
      let {
        rate: { remaining },
      } = data;

      setRequests(remaining);
      if (remaining === 0) {
        toggleError(true, "sorry, you have exeeded your hourly rate limit!!");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const toggleError = (show = false, msg = "") => {
    setError({ show, msg });
  };
  useEffect(() => {
    getRequests();
  }, []);
  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repo,
        followers,
        requests,
        error,
        searchGithubUser,
        loading,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

const useGithubContext = () => {
  return useContext(GithubContext);
};

export { GithubContext, GithubProvider, useGithubContext };
