import { useEffect, useState } from "react";
import { PostList } from "./features/posts/PostList/PostList";
import { PostView } from "./components/PostView/PostView";
import { SignUp } from "./components/SignUp/SignUp";
import { SignIn } from "./components/SignIn/SignIn";
import { EditProfile } from "./components/EditProfile/EditProfile";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { NewPost } from "./features/NewPost/NewPost";
import { EditPost } from "./features/EditPost/EditPost";

function App() {
  const [logged, setLogged] = useState(
    JSON.parse(localStorage.getItem("isLoggedIn"))
  );
  useEffect(() => {
    const onStorage = () => {
      setLogged(JSON.parse(localStorage.getItem("isLoggedIn")));
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout logged={logged} />}>
          <Route path="articles" element={<PostList />} />
          <Route path="new-article" element={<NewPost logged={logged} />} />
          <Route path="edit/:slug" element={<EditPost />} />
          <Route path="postView/:slug" element={<PostView logged={logged} />} />
          <Route path="signUp" element={<SignUp />} />
          <Route path="signIn" element={<SignIn />} />
          <Route path="profile" element={<EditProfile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
