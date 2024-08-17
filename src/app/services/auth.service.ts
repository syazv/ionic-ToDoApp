import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private auth:Auth, private storage: Storage) { }

  async register(email: string, password: string, name: string, profileImage: File){
    
    // createUserWithEmailAndPassword - method firebase to register a user
    // createUserWithEmail (tanpa password) -> passwordless sign in
    const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
    const user = userCredential.user;

    // Upload profile image
    const filePath = `profile_images/${user.uid}`; // Nama folder dan file di Firebase storage
    const fileRef = ref(this.storage, filePath); // Reference full path in firebase storage
    await uploadBytes(fileRef, profileImage); // Upload the image to the path

    // Get the image URL
    const photoURL = await getDownloadURL(fileRef);

    // Update user profile (method firebase)
    await updateProfile(user, {
      displayName: name,
      photoURL
    });
 
    return userCredential;
  }

  signIn(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  resetPassword(email:string){
    return sendPasswordResetEmail(this.auth, email)
  }
 
 
}
