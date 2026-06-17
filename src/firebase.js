import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDvf8Lnqw3oNYuTLSD_zJMR-pgZzz2Qdck",
  authDomain: "my-hotel-booking-project-c2e21.firebaseapp.com",
  projectId: "my-hotel-booking-project-c2e21",
  storageBucket: "my-hotel-booking-project-c2e21.firebasestorage.app",
  messagingSenderId: "938539733106",
  appId: "1:938539733106:web:c02ee3afeacca4266cb2eb",
  measurementId: "G-XBQQ688BQB"
};

const app = initializeApp(firebaseConfig);
getAnalytics(app);

export const auth = getAuth(app);