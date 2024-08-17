import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  email: string = "";
  password: string = "";
  
  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit() {
  }
  
  login() {
    this.authService.signIn(this.email, this.password).then((userCredential) => {
      this.router.navigate(['/todo'])
      console.log('User logged in:', userCredential);
    }).catch((error) => {
      console.error('Login error:', error);
    });
  }

  async resetPressed() {
    if (this.email != "") {
      await this.authService.resetPassword(this.email)
     
      // TODO : Redirect to login page
      // TODO : Show a toast
      console.log("Reset email successfully sent")
    }
  }
 
 
}
