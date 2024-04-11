import firebase_app from "@/lib/firebase-config";
import { getAuth, signOut as so } from "firebase/auth";

const auth = getAuth(firebase_app);

export default async function signOut() {
  let result = null,
    error = null;
  try {
    result = await so(auth);
  } catch (e) {
    error = e;
  }

  return { result, error };
}
