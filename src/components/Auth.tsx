import React, { useEffect, useState } from "react";

import firebase from "firebase/compat/app";
import { onAuthStateChanged, signOut, getAuth } from "firebase/auth";

import { Redirect, useLocation } from "@docusaurus/router";

import {
  BASE,
  LOGOUT_PATH,
  LOGIN_PATH,
  PROTECTED_PATHS,
} from "../config/constants";
import { firebaseConfig } from "../config/firebaseConfig";
import Loading from "./Loading";
import { Login } from "./Login";

firebase.initializeApp(firebaseConfig);

export const auth = getAuth();

export function AuthCheck({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      setAuthLoading(false);
    });
  });

  const location = useLocation();
  let from = location.pathname;

  if (authLoading) return <Loading />;

  if (user?.email) {
    if (from === LOGOUT_PATH) {
      signOut(auth);
      return <Redirect to={BASE} from={LOGOUT_PATH} />;
    } else if (from === LOGIN_PATH) return <Redirect to={BASE} from={from} />;

    return children;
  } else {
    if (from === LOGOUT_PATH) return <Redirect to={BASE} from={from} />;
    else if (PROTECTED_PATHS.filter((x) => from.includes(x)).length)
      return <Login />;
    else if (from === LOGIN_PATH) return <Login />;
    return children;
  }
}