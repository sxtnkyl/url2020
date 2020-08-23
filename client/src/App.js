import React from "react";
import { BrowserRouter as Switch, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

//makes post req "/url/shorten"
import SearchBtn from "./SearchBtn";
//makes get req "/:shortUrl"
import ShortenedUrl from "./shortenedUrl";
import GitLink from "./gitLink";

function App() {
  //browser session management
  //https://javamastermind.com/2020/01/16/react-navigation-manage-session-history/
  //https://stackoverflow.com/questions/27928372/react-router-urls-dont-work-when-refreshing-or-writing-manually
  const location = useLocation();
  console.log(location);

  return (
    <div className="bg-blue-400 w-full h-full m-0 flex flex-col justify-center items-center font-roboto overflow-hidden">
      <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location.pathname}>
          <Route path="*" component={GitLink} />
          <Route path="/" component={SearchBtn} />
          <Route path="/:shortUrl" render={() => <ShortenedUrl />} />
        </Switch>
      </AnimatePresence>
    </div>
  );
}

export default App;
