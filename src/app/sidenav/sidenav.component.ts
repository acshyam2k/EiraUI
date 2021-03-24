import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { SidenavService } from '../service/sidenav.service';
import { onSideNavChange, animateText } from '../animations/animations'
import { NavItem } from '../shared/nav-item';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { SideNavMenuComponent } from '../side-nav-menu/side-nav-menu.component';




interface Page {
  link: string;
  name: string;
  icon: string;
 }
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
  animations: [onSideNavChange, animateText]

})
export class SidenavComponent implements OnInit {

  public sideNavState: boolean = true;
  public linkText: boolean = true;
  eiraImageSrc = '../../assets/eira32x32.png'


  expanded: boolean = false;

  public pages: Page[] = [
    {name: 'Home', link:'some-link', icon: 'home'},
    {name: 'Visualization', link:'some-link', icon: 'insights'},
    {name: 'Operation & Maintenance', link:'some-link', icon: 'build_circle'},
    {name: 'Analytics', link:'some-link', icon: 'analytics'},
    {name: 'Documentation', link:'some-link', icon: 'folder'},
    {name: 'Reports', link:'some-link', icon: 'article'},
    {name: 'Configuration', link:'some-link', icon: 'miscellaneous_services'},


  ]


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
           { displayName:"Customer", route: 'customer', iconName: ''},
           { displayName:"Site", route: 'site', iconName: ''},
           { displayName:"Equipment", route:'equipment', iconName: ''},
           {displayName:"Equipment Type", route:'equipmenttype', iconName: ''},
           {displayName:"Equipment Category", route:'equipment-category', iconName: ''},

           { displayName:"DataLogger", route:'datalogger', iconName: ''}
       ] }];




  constructor(private _sidenavService: SidenavService,
    public router: Router) { }

  ngOnInit() {
  }

  onSidenavToggle() {
    this.sideNavState = !this.sideNavState

    setTimeout(() => {
      this.linkText = this.sideNavState;
    }, 200)
    this._sidenavService.sideNavState$.next(this.sideNavState);
   }


}
