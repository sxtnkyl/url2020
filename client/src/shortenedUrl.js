import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  responseComponent,
  scaleIn,
  scaleHoverTap,
} from "./utility/animations";
import { CopyToClipboard } from "react-copy-to-clipboard";

const ShortenedUrl = () => {
  const location = useLocation();
  //svg from fontawesome repo
  //https://github.com/encharm/Font-Awesome-SVG-PNG/blob/master/black/svg/clone.svg?short_path=20b6998
  let { longUrl, shortUrl } = location.state;
  const [copy, setCopy] = useState({
    value: shortUrl,
    copied: false,
  });

  let diff = longUrl.length - shortUrl.length;
  let charStr = "Wow! Your url is now " + diff + " characters shorter!";

  const UrlComponent = (
    <motion.div
      className="relative rounded-md w-full"
      variants={scaleHoverTap}
      whileHover="hover">
      <span className="absolute inset-y-0 left-0 flex items-center px-2 md:px-4 outline-none cursor-pointer">
        <CopyToClipboard
          onCopy={() => setCopy({ coped: true })}
          text={copy.value}>
          <motion.div
            type="div"
            variants={scaleHoverTap}
            whileHover="hover"
            whileTap="tap"
            id="copyButton"
            // type="submit"
            className="border md:border-2 border-current rounded-md text-blue-700 focus:outline-none">
            <svg
              className="fill-current p-1 md:p-2 w-5 h-5 md:w-10 md:h-10"
              width="1792"
              height="1792"
              strokeWidth="1.5"
              viewBox="0 0 1792 1792"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M1664 1632v-1088q0-13-9.5-22.5t-22.5-9.5h-1088q-13 0-22.5 9.5t-9.5 22.5v1088q0 13 9.5 22.5t22.5 9.5h1088q13 0 22.5-9.5t9.5-22.5zm128-1088v1088q0 66-47 113t-113 47h-1088q-66 0-113-47t-47-113v-1088q0-66 47-113t113-47h1088q66 0 113 47t47 113zm-384-384v160h-128v-160q0-13-9.5-22.5t-22.5-9.5h-1088q-13 0-22.5 9.5t-9.5 22.5v1088q0 13 9.5 22.5t22.5 9.5h160v128h-160q-66 0-113-47t-47-113v-1088q0-66 47-113t113-47h1088q66 0 113 47t47 113z" />
            </svg>
          </motion.div>
        </CopyToClipboard>
      </span>
      <a
        href={`https://${shortUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        title="shortUrl-link">
        <div className="p-2 text-center md:pl-20 pr-4 rounded-md text-base md:text-3xl text-blue-900 bg-blue-200 w-full">
          {shortUrl}
        </div>
      </a>
    </motion.div>
  );

  return (
    <motion.form
      layout
      className="p-4 pt-6 w-auto"
      action="somelongurl"
      variants={responseComponent}
      initial="hidden"
      animate="visible">
      {UrlComponent}
      <motion.div
        variants={scaleIn}
        className="text-center py-4 text-blue-900 text-base md:text-xl font-sans font-semibold">
        {charStr}
      </motion.div>
    </motion.form>
  );
};

export default ShortenedUrl;
