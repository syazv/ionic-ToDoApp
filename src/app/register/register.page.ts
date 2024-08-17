import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  name:string = ""
  email: string = ""
  password:string = ""
  profileImage:string|undefined
  profileFile:File|null = null
  
  constructor(private authService:AuthService) { }

  ngOnInit() {
  }

  async register(){
    if (this.name != "" && this.email != ""&& this.password != "" && this.profileImage) {
      try {
        await this.authService.register(this.email, this.password, this.name, this.profileFile!!);
        // TODO : Bring out toast
        // TODO : Redirect to Login page
       console.log("Registration successful")
      } catch (error) {
        console.error('Registration error:', error);
      }
    }
  }

  async captureImage (){

    const image = await Camera.getPhoto({
    quality: 90, 
    allowEditing: true, 
    resultType: CameraResultType.Uri
    
  });
 
  this.profileImage = image.webPath
  this.profileFile = await this.uriToFile(this.profileImage!!, `profile_${new Date()}.jpeg`)
}

async uriToFile(uri: string, filename: string): Promise<File> {
  // Fetch the image data
  const response = await fetch(uri);
  const blob = await response.blob();
   // Convert the Blob to a File
  const file = new File([blob], filename, { type: blob.type });
  return file;
}


}
