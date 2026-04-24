import { getApps, initializeApp } from "firebase/app";
import { firebaseConfig } from "@/config/firebase.config";

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
export { app };