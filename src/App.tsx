import React from "react";
import BootcampPage from "./BootcampPage";
import FullStackBootcampPage from "./FullStackBootcampPage";
import HomePage from "./HomePage";
import { BOOTCAMP_PATH, BOOTCAMP_WATCH_PATH, FULLSTACK_PATH } from "./routes";

export default function App({ route = "/" }: { route?: string }) {
  const path = route.replace(/\/+$/, "") || "/";
  if (path === BOOTCAMP_PATH || path === BOOTCAMP_WATCH_PATH) return <BootcampPage />;
  if (path === FULLSTACK_PATH) return <FullStackBootcampPage />;
  return <HomePage />;
}
