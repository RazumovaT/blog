import { useEffect, useState } from "react";
import { PostList } from "./features/posts/PostList/PostList";
import { PostView } from "./features/posts/PostView/PostView";
import { SignUp } from "./features/posts/SignUp/SignUp";
import { SignIn } from "./features/posts/SignIn/SignIn";
import { EditProfile } from "./features/users/EditProfile/EditProfile";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { NewPost } from "./features/posts/NewPost/NewPost";
import { EditPost } from "./features/posts/EditPost/EditPost";

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

  const [user, setUser] = useState("");

  const getCurrentUser = () => {
    setUser(JSON.parse(window.localStorage.getItem("user")));
  };
  useEffect(() => {
    window.addEventListener("user", getCurrentUser);
    return () => window.removeEventListener("user", getCurrentUser);
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout logged={logged} user={user} />}>
          <Route path="articles" element={<PostList logged={logged} />} />
          <Route path="new-article" element={<NewPost logged={logged} />} />
          <Route path="edit/:slug" element={<EditPost />} />
          <Route path="postView/:slug" element={<PostView logged={logged} />} />
          <Route path="signUp" element={<SignUp />} />
          <Route path="signIn" element={<SignIn />} />
          <Route path="profile" element={<EditProfile user={user} />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
