import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import WritePage from "./pages/write";
import Path from "./utils/routes/Path";

function App() {
  const { HOME, LOGIN, SIGNUP, WRITE } = Path;

  return (
    <div className="App">
      <Routes>
        <Route path={HOME} element={<div>잘됩니다</div>} />
        {/* 기훈 */}
        <Route path={LOGIN} element={<LoginPage />} />
        <Route path={SIGNUP} element={<SignupPage />} />
        {/* 동현 */}
        <Route path={WRITE} element={<WritePage />} />
        {/*  */}
        <Route path="login" element={<div></div>} />
        <Route path="login" element={<div></div>} />

        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
