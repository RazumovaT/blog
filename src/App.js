import { useEffect, useState } from "react";
import { PostList } from "./features/posts/PostList/PostList";
import { PostView } from "./features/posts/PostView/PostView";
import { SignUp } from "./features/posts/SignUp/SignUp";
import { SignIn } from "./features/posts/SignIn/SignIn";
import { EditProfile } from "./features/users/EditProfile/EditProfile";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { NewPost } from "./features/posts/NewPost/NewPost";
import { EditPost } from "./features/posts/EditPost/EditPost";
import { store } from "./app/store";
import { extendedPostApi } from "./features/posts/postsSlice";

function App() {
  let token = JSON.parse(window.localStorage.getItem("token"));

  const [page, setPage] = useState(1);

  const offset = (page - 1) * 5;

  const [user, setUser] = useState(
    JSON.parse(window.localStorage.getItem("user"))
  );

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

  const getCurrentUser = () => {
    setUser(JSON.parse(localStorage.getItem("user")));
  };

  useEffect(() => {
    window.addEventListener("user", getCurrentUser);
    return () => window.removeEventListener("user", getCurrentUser);
  }, []);

  store.dispatch(
    extendedPostApi.endpoints.getPosts.initiate({ offset, token })
  );

  return (
    <>
      <Header logged={logged} user={user} />
      <Routes>
        <Route
          path="/"
          element={
            <PostList
              logged={logged}
              page={page}
              setPage={setPage}
              offset={offset}
              token={token}
            />
          }
        />
        <Route
          path="new-article"
          element={<NewPost logged={logged} token={token} />}
        />
        <Route
          path="edit/:slug"
          element={<EditPost token={token} user={user} />}
        />
        <Route
          path="postView/:slug"
          element={<PostView logged={logged} token={token} user={user} />}
        />
        <Route path="signUp" element={<SignUp />} />
        <Route path="signIn" element={<SignIn />} />
        <Route
          path="profile"
          element={<EditProfile user={user} token={token} />}
        />
      </Routes>
    </>
  );
}

export default App;
