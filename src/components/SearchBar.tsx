import React, {ChangeEvent, useEffect, useState} from 'react';
import {User} from "../models/models";

interface SearchBarProps {
  loading: boolean;
  data?: User[];
  onChange: (query: string) => void;
  onClick: (username: string) => void;
  value?: string;
}

export default function SearchBar(props: SearchBarProps) {
  const {loading, data = [], value = '', onChange, onClick} = props;
  const [dropdown, setDropdown] = useState(false);

  useEffect(() => {
    setDropdown(value.length >= 3 && !!data?.length)
  }, [value, data]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  }

  const handleClick = (username: string) => {
    setDropdown(false);
    onClick(username);
  }

  return (
    <div className="w-[560px] mx-auto relative">
      <input
        type="text"
        className="border py-2 px-4 w-full h-[42px] mb-2"
        placeholder="Search for github username"
        onChange={handleChange}
        value={value}
      />

      {
        dropdown && (
          <ul className="list-none absolute top-[42px] left-0 right-0 max-h-[200px] overflow-y-scroll shadow-md bg-white">
            { loading && <li>Loading...</li>}
            { data?.map((user: User) => (
              <li
                key={user.id}
                onClick={() => handleClick(user.login)}
                className="py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer"
              >
                {user.login}
              </li>
            ))}
          </ul>
        )
      }
    </div>
  )
}