import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDataObjectService } from '../service/user-data-object.service';
import { UserRegistrationComponent } from '../user-registration/user-registration.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  encapsulation : ViewEncapsulation.None})
export class SignupComponent implements OnInit {

  isUserLoggedIn = false;
  isInValidLogin = false;
  hide = true;

  public screenWidth: any;
  public screenHeight: any;
  public cardHeight: any;
  public cardWidth:any;


  signupForm = this.fb.group({
    username: [null, Validators.required],
    password: [null, Validators.required]
  });

  ngOnInit(): void {
      this.screenWidth = window.innerWidth;
      this.screenHeight = window.innerHeight;
      this.cardHeight = this.screenHeight * (80/100);
      this.cardWidth = this.screenWidth * (80/100);

   }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenWidth = window.innerWidth;
    //this.screenHeight = window.innerHeight  * (80/100);
    this.screenHeight = window.innerHeight;
    this.cardHeight = this.screenHeight * (80/100);

    this.cardWidth = this.screenWidth * (80/100);

  }
  constructor(private router: Router,
    private fb: FormBuilder, private userDataObjectService:UserDataObjectService) { }



   handleSignup() {
     if (this.signupForm.valid) {
      var loginData = this.signupForm.value;
      var username = loginData.username;
      var password = loginData.password;
      this.userDataObjectService.userData = loginData;
      this.router.navigate(['user-registration']);


     }




   }


}
