import React, {useCallback, useDeferredValue, useEffect, useState, useTransition} from 'react';
import {useLazyGetUserReposQuery, useSearchUsersQuery} from '../store/github/github.api';
import {Repo} from "../models/models";
import RepoCard from "../components/RepoCard";
import SearchBar from "../components/SearchBar";
import {useDebounce} from "../hooks/debounce";


export function HomePage() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query);
  const {isLoading, isError, data} = useSearchUsersQuery(debouncedQuery, {
    skip: debouncedQuery.length < 3,
  });
  const [fetchRepos, {isLoading: areReposLoading, data: repos}] = useLazyGetUserReposQuery();

  const handleClick = (username: string) => {
    fetchRepos(username);
  }

  return (
    <div className="flex flex-col align-center pt-10 mx-auto h-screen w-screen">
      <SearchBar
        loading={isLoading}
        onClick={handleClick}
        onChange={setQuery}
        value={query}
        data={data}
      />

      <div className="container w-[560px] mx-auto my-5">
        { isError && <p className="text-center text-red-600">Something went wrong...</p> }
        { areReposLoading && <p className="text-center">Repos are loading...</p> }
        { repos?.map((repo: Repo) => <RepoCard repo={repo} key={repo.id} />) }
      </div>
    </div>
  )
}
