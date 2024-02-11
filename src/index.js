import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { extendedPostApi } from "./features/posts/postsSlice";
import { BrowserRouter as Router } from "react-router-dom";

// store.dispatch(extendedPostApi.endpoints.getPosts.initiate());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>
);
