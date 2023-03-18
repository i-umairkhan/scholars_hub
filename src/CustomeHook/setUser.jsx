import { collection, getDocs } from "firebase/firestore";
import { useContext } from "react";
import { db } from "../../firebase-config";

export const setUser = async (user, isOrg) => {
  const usersCollectionRef = collection(db, isOrg);
  const maindata = await getDocs(usersCollectionRef);
  const email = user.email;
  console.log(email);
  const allDocs = maindata.docs;
  console.log(allDocs);
  const docsData = allDocs.map((doc) => {
    return doc.data();
  });
  const currentUser = docsData.filter((doc) => doc.email === email);
  console.log(currentUser);

  return currentUser[0];
};
