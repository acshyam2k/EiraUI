import { HostListener } from '@angular/core';
import { Component } from '@angular/core';
import { onMainContentChange } from './animations/animations';
import { LoginStatusService } from './service/login-status.service';
import { SidenavService } from './service/sidenav.service';
import { NavItem } from './shared/nav-item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [ onMainContentChange ]

})
export class AppComponent {
  title = 'eira';
  public onSideNavChange: boolean;
  public isUserLoggedIn: boolean;

  public screenWidth: any;
  public screenHeight: any;



  navItems: NavItem[] = [
    { displayName: 'Home', iconName: 'home' },
    { displayName: 'Visualization', iconName: 'insights' },
    { displayName: 'Operation & Maintenance', iconName: 'build_circle' },
    { displayName: 'Analytics', iconName: 'analytics' },
    { displayName: 'Documentation', iconName: 'folder' },
    { displayName: 'Reports', iconName: 'article' },
    { displayName: 'Configuration', iconName: 'miscellaneous_services',
       children: [
           { displayName:"Company", route: 'company', iconName: ''},
           { displayName:"Site", route: 'site', iconName: ''},
           { displayName:"Equipment", route:'equipment', iconName: ''}
       ] }];

  constructor(private _sidenavService: SidenavService,
    private _loginStatusService: LoginStatusService
    ) {
    this._sidenavService.sideNavState$.subscribe( res => {
      console.log("Side Nav Stateus::"  + res)
      this.onSideNavChange = res;
    });

    this._loginStatusService.loginState$.subscribe( res => {
      console.log("Login Status>>" + res);
      this.isUserLoggedIn = res;
    });
  }

  ngOnInit() {
      this.screenWidth = window.innerWidth;
      this.screenHeight = window.innerHeight;
    }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;

  }

}
