import React from "react";
import Markdown from "react-markdown";

export const MarkdownLayer = ({ props }) => {
  return <>{props && <Markdown>{props}</Markdown>}</>;
};
