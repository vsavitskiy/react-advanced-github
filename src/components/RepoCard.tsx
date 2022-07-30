import React, {useState} from 'react';
import {Repo} from "../models/models";
import {useActions} from "../hooks/actions";
import {useAppSelector} from "../hooks/redux";

interface RepoCardProps {
  repo: Repo
}

export default function RepoCard({ repo }: RepoCardProps) {
  const {addFavourite, removeFavourite} = useActions();
  const {favourites} = useAppSelector(state => state.github);
  const [isFavourite, setIsFavourite] = useState(favourites.indexOf(repo.html_url) !== -1);

  const handleAddToFavourite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    addFavourite(repo.html_url);
    setIsFavourite(true);
  }

  const handleRemoveToFavourite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    removeFavourite(repo.html_url);
    setIsFavourite(false);
  }

  return (
    <div className="border py-3 px-5 rounded cursor-pointer mb-2 hover:shadow-md hover:bg-gray-100 transition-all">
      <a href={repo.html_url} target="_blank">
        <h2 className="text-lg font-bold">{repo.url}</h2>
        <p className="text-sm">
          Forks: <span className="font-bold mr-2">{repo.forks}</span>
          Watchers: <span className="font-bold">{repo.watchers}</span>
        </p>
        <p className="text-sm font-thin">
          {repo.description }
        </p>

        {
          isFavourite && (
            <button
              className="py-2 px-4 bg-red-400 rounded hover:shadow-md transition-all"
              onClick={handleRemoveToFavourite}
            >
              Remove to favourites
            </button>
          )
        }

        { !isFavourite && (
            <button
              className="py-2 px-4 bg-yellow-400 rounded hover:shadow-md transition-all"
              onClick={handleAddToFavourite}
            >
              Add to favourites
            </button>
          )
        }
      </a>
    </div>
  )
}
