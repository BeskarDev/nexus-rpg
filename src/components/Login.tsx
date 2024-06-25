
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

import { auth } from "./Auth";
import "./styles.css";

// Configure FirebaseUI.
export const uiConfig = {
  signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
};

export function Login() {
  return (
    <div className="auth-wrapper">
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
    </div>
  );
}