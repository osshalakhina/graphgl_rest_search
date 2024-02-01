import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@apollo/client";
import CharactersList from "components/UI/CharactersList";
import {
  CharactersResponse,
  CharactersVariables,
  NavigateFnParams,
} from "types";
import { charactersQuery } from "apollo/queries/characters";
import "./index.scss";

const CharactersGraphql = () => {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState("");
  // const inputRef = useRef();

  const { loading, error, data } = useQuery<
    CharactersResponse,
    CharactersVariables
  >(charactersQuery, {
    variables: {
      page,
      filter: {
        name: search,
      },
    },
  });
  const handleReset = () => {
    setSearch("");
  };

  //поиск по сайту
  return (
    <div>
      <button onClick={handleReset}> Search:</button>
      <input
        value={search}
        type="text"
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading && <div>Loading...</div>}
      {!loading && (
        <CharactersList
          list={data?.characters.results}
          info={data?.characters.info}
          onNavigate={(value: NavigateFnParams) => {
            if (value === "next") {
              setPage(page + 1);
            } else {
              setPage(page - 1);
            }
          }}
        />
      )}
    </div>
  );
};

export default CharactersGraphql;
