import { useState, useRef, useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import GooeyFilter from "./gooeyFilter";
import LoadingIcon from "./loadingIcon";

const SearchBar = () => {
  const inputRef = useRef(null);

  const [state, setState] = useState({
    step: 1, // 1: Initial, 2: Search
    searchData: [],
    searchText: "",
    isLoading: false,
  });

  return (
    <div>
      <GooeyFilter />
    </div>
  );
};

export default SearchBar;
