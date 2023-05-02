import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Page/Home";
import Join from "./Page/Join";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/join" element={<Join />} />
      </Routes>
    </Router>
  );
};
export default AppRouter;
