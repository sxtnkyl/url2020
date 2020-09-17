import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";

import useAsync from "./utility/hooks";
import {
  slideInFromTop,
  scaleIn,
  scaleHoverTap,
  loading,
} from "./utility/animations";

const SearchBtn = () => {
  const history = useHistory();
  let state = history.location.state;

  const position = state
    ? "flex flex-col p-4 pb-6 w-10/12 md:w-1/2"
    : "flex flex-col p-4 w-10/12 md:w-1/2";

  const [tooshort, setTooShort] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setTooShort(false);
    }, 8000);
  }, [tooshort]);

  const [longUrl, setUrl] = useState("");
  useEffect(() => {
    if (state) setUrl(state.longUrl);
  }, [state]);

  const handleInputChange = (event) => {
    setUrl(event.target.value);
  };

  const checkLength = (res) => {
    let { longUrl } = res.data;
    let base = "http://hiropes.info/123456";
    if (longUrl.length <= base.length) setTooShort(true);
    else {
      setTooShort(false);
      history.push(res.data.path, { ...res.data });
    }
  };

  const sendLongUrl = async (e) => {
    //prevent page refresh on form submit
    e.preventDefault();
    try {
      await Axios({
        method: "post",
        headers: { "Content-Type": "application/json" },
        //nodeMongo method
        // url: "http://localhost:5001/url/shorten",
        // AWS method- set cors origin in apiGateway
        url: "https://sfcdy8v1ha.execute-api.us-east-1.amazonaws.com/beta",
        data: {
          longUrl: longUrl,
        },
      }).then((res) => checkLength(res));
    } catch (error) {
      console.log(error);
    }
  };
  const { execute, status, value, error } = useAsync(sendLongUrl, false);

  const restartSearch = () => {
    setUrl("");
    history.push("/", null);
  };

  const searchSVG = (
    <svg
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      className="stroke-current p-1 md:p-2 w-5 h-5 md:w-10 md:h-10 stroke-2"
    >
      <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
    </svg>
  );

  const labelComponent = (
    <motion.div
      layout
      className="flex justify-between py-4 text-blue-900 text-xs md:text-lg font-sans font-semibold"
      variants={scaleIn}
    >
      <label className="text-base md:text-2xl">Need a shorter Url?</label>
      <motion.label
        variants={scaleHoverTap}
        whileHover="hover"
        whileTap="tap"
        className="border border-1 rounded-md bg-blue-200 border-blue-900 cursor-pointer uppercase px-2 leading-loose"
        onClick={restartSearch}
      >
        restart
      </motion.label>
    </motion.div>
  );
  const inputComponent = (
    <motion.div
      layout
      className="relative rounded-md w-full"
      variants={scaleIn}
    >
      <span className="absolute inset-y-0 left-0 flex items-center px-2 md:px-4 outline-none">
        <motion.button
          variants={status !== "pending" ? scaleHoverTap : loading}
          initial={status !== "pending" && "hidden"}
          whileHover={status !== "pending" && "hover"}
          animate={status === "pending" ? "animate" : "visible"}
          transition={status === "pending" && "transition"}
          onClick={execute}
          disabled={status === "pending"}
          type="submit"
          id="searchButton"
          className="border md:border-2 border-current rounded-md text-blue-700 focus:outline-none"
        >
          {searchSVG}
        </motion.button>
      </span>
      <input
        type="url"
        value={longUrl}
        onChange={handleInputChange}
        name="q"
        className="p-2 pl-10 md:pl-20 pr-4 rounded-md placeholder-blue-400 text-base md:text-3xl text-blue-900 bg-blue-200 w-full focus:outline-none"
        placeholder="Enter URL..."
        autoComplete="off"
        required
      />
    </motion.div>
  );

  const tooShortDiv = (
    <motion.div
      layout
      variants={scaleIn}
      className="text-center text-blue-900 text-base md:text-xl font-sans font-semibold py-4"
    >
      That url is already pretty short...try another!
    </motion.div>
  );

  return (
    <motion.form
      layout
      className={position}
      variants={slideInFromTop}
      initial="hidden"
      animate="visible"
    >
      <AnimateSharedLayout>
        {labelComponent}
        {inputComponent}
        <AnimatePresence>{tooshort && tooShortDiv}</AnimatePresence>
      </AnimateSharedLayout>
    </motion.form>
  );
};

export default SearchBtn;
