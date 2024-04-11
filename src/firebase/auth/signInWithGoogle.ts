import firebase_app from "@/lib/firebase-config";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const auth = getAuth(firebase_app);

export async function signInWithGoogle() {
  let result = null,
    error = null;
  try {
    const provider = new GoogleAuthProvider();
    result = await signInWithPopup(auth, provider);
  } catch (e) {
    error = e;
  }

  return { result, error };
}
