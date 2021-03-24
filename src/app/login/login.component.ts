import { ViewEncapsulation } from '@angular/core';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginStatusService } from '../service/login-status.service';
import { SimpleAuthenticationService } from '../service/simple-authentication.service';
import { TokenStorageService } from '../service/tokenStorage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation : ViewEncapsulation.None,

})
export class LoginComponent implements OnInit {

  isUserLoggedIn = false;
  isInValidLogin = false;
  hide = true;

  public screenWidth: any;
  public screenHeight: any;
  public cardHeight: any;
  public cardWidth:any;


  loginForm = this.fb.group({
    username: ['eira', Validators.required],
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
    private simpleAuthenticationService: SimpleAuthenticationService,
    private _loginStatusService: LoginStatusService,
    private fb: FormBuilder,
    private tokenStorage: TokenStorageService) { }



   handleLogin() {
     if (this.loginForm.valid) {
      var loginData = this.loginForm.value;
      var username = loginData.username;
      var password = loginData.password;


      this.simpleAuthenticationService.authenticate(username, password).subscribe(
        data => {
          console.log(data);
          this.tokenStorage.saveToken(data.token);
          this.tokenStorage.saveUser(data);
          this.isUserLoggedIn = true;
          this._loginStatusService.loginState$.next(this.isUserLoggedIn);
          this.router.navigate(['site']);

          //this.isLoginFailed = false;
          //this.isLoggedIn = true;
          //this.roles = this.tokenStorage.getUser().roles;
          //this.reloadPage();
        },
        err => {
          this.isInValidLogin = true;

        }
      );
    }




   }

}
