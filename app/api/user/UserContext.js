import { db } from '@/firebase/firebaseConfig.ts'

import {doc, collection, getDocs, addDoc, updateDoc, deleteDoc, getDoc, Timestamp} from "firebase/firestore";


export async function getAllUsers(roomID){
    const roomDocRef = doc(db, "rooms", roomID);
    const docRef = collection(roomDocRef, "Users");
    const docsSnap = await getDocs(docRef);
    // Loop through documents in the collectio

    const users = [];
   
    if (docsSnap.empty) {
      console.log("No documents found in the tasks collection.");
    }
  
    docsSnap.forEach((doc) => {

      const data = doc.data();
      const taskData = { 
              name: data['name'],
              points: data['points'],
              major: data['major'],
              pronouns: data['pronouns'],
              sleepingHours: data['sleepingHours'],
              favoriteThing: data['favoriteThing'],
              user_ID: data['user_ID'],
              room_ID: roomID,

        };
        users.push(taskData)

      
    });
    return users;
}
export async function addUser(roomID, name){

    const roomDocRef = doc(db, "rooms", roomID);
    const docRef = collection(roomDocRef, "Tasks");
    const newDocRef = await addDoc(docRef, {
        name: name,
        points: 0,
        major: "",
        pronouns: "",
        sleepingHours: "",
        favoriteThing:"",
        room_ID: roomID,
      });
    console.log("New document ID: ", newDocRef.id);
    const taskRef = doc(db, "rooms", roomID, "Tasks", newDocRef.id)
    await updateDoc(taskRef, {
        name: name,
        points: 0,
        major: "",
        pronouns: "",
        sleepingHours: "",
        favoriteThing:"",
        user_ID: newDocRef.id,
        room_ID: roomID,
    });
    return newDocRef.id;
    
}

export async function deleteUser(roomID, userID){
    const taskDocRef = doc(db, "rooms", roomID, "Users", userID);
    await deleteDoc(taskDocRef);

}


export async function updateUserProfile(roomID, userID, name, major, pronouns, sleepingHours, favoriteThing){

    const userRef = doc(db, "user", userID);
    const userSnap = await getDoc(userRef);

    const userData = userSnap.data();
    console.log("profile update");
    console.log(userData);
    
 
    await updateDoc(userRef, {
        name: name,
        points: userData['points'],
        major: major,
        pronouns: pronouns,
        sleepingHours: sleepingHours,
        favoriteThing: favoriteThing,
        user_ID: userID,
        room_ID: roomID,
        
    });

}

export async function updateUserPoints(points){

    const roomID = "bOfA98OEsUdA1ZDkGz8d";
    const userID = 'D3eIVTebFOhTKaptvyDCXfF0TYb2';
   
    const userRef = doc(db, "user", userID);
    const userSnap = await getDoc(userRef);

    console.log("points update");
    

    const userData = userSnap.data();
    console.log(userData);
    console.log(points);
    await updateDoc(userRef, {
        name:  userData.name,
        points: points,
        major: userData.major,
        pronouns: userData.pronouns,
        sleepingHours: userData.sleepingHours,
        favoriteThing: userData.favoriteThing,
        user_ID: userData.user_ID,
        room_ID: userData.room_ID,
        
    });

}
export async function getUser(roomID, userID){
    const userRef =  doc(db, "user", userID)
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
        console.log("Document data:", userSnap.data());
        const data = userSnap.data();
        return {
            name: data['name'],
            points: data['points'],
            major: data['major'],
            pronouns: data['pronouns'],
            sleepingHours: data['sleepingHours'],
            favoriteThing: data['favoriteThing'],
            user_ID: data['user_ID'],
            room_ID: roomID,
       };
   
       } else {
      
       console.log("No such document!");
       }   
    
}