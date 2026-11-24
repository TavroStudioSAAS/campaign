import React from "react";
import BootcampPage from "./BootcampPage";
import HomePage from "./HomePage";
import { BOOTCAMP_PATH } from "./routes";

export default function App({ route = "/" }: { route?: string }) {
  const path = route.replace(/\/+$/, "") || "/";
  return path === BOOTCAMP_PATH ? <BootcampPage /> : <HomePage />;
}
