import {initializeApp} from "firebase/app";
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyAvEvlr_1VViXYfmSus3DZp9bOHVcUtF4M",
  authDomain: "birdshunters-chile.firebaseapp.com",
  projectId: "birdshunters-chile",
  storageBucket: "birdshunters-chile.appspot.com",
  messagingSenderId: "847126193909",
  appId: "1:847126193909:web:5c1974dad17d765b8e87bc",
};

// Inicialización de firebase
export const app = initializeApp(firebaseConfig);
export const imagesStorage = getStorage();
