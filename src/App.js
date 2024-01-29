import { PostList } from "./features/posts/PostList/PostList";
import { Header } from "./components/Header/Header";
import { PostForm } from "./components/PostForm/PostForm";
import { PostView } from "./components/PostView/PostView";
import { CreateProfile } from "./components/CreateProfile/CreateProfile";
import { SignIn } from "./components/SignIn/SignIn";
import { EditProfile } from "./components/EditProfile/EditProfile";
import { Routes, Link, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/postForm" element={<PostForm />} />
        <Route path="/postForm" element={<PostForm />} />
        <Route path="/postView/:slug" element={<PostView />} />
        <Route path="/createProfile" element={<CreateProfile />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/editProfile" element={<EditProfile />} />
      </Routes>
    </>
  );
}

export default App;
