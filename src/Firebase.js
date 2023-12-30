import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


console.log(process.env.React_App_Auth_Domain)
const firebaseConfig = {
    apiKey: process.env.React_App_Key,
    authDomain: process.env.React_App_Auth_Domain,
    projectId: process.env.React_App_pID,
    storageBucket: process.env.React_App_sBucket,
    messagingSenderId: process.env.React_App_messagingSenderId,
    appId:  process.env.React_App_appID
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export default app;