import { trigger, state, style, transition, animate } from '@angular/animations';
import { HostBinding, Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { animateText } from '../animations/animations';
import { SidenavService } from '../service/sidenav.service';
import { NavItem } from '../shared/nav-item';

@Component({
  selector: 'app-side-nav-menu',
  templateUrl: './side-nav-menu.component.html',
  styleUrls: ['./side-nav-menu.component.scss'],
  animations: [animateText,
    trigger('indicatorRotate', [
      state('collapsed', style({transform: 'rotate(0deg)'})),
      state('expanded', style({transform: 'rotate(180deg)'})),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])]

})
export class SideNavMenuComponent implements OnInit {

  expanded: boolean = false;


  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @Input() item: NavItem;
  @Input() depth: number;
  @Input() sideNavToggleState: boolean;
  constructor(public router: Router, public sidenavService: SidenavService) { }

  ngOnInit(): void {
    this.sidenavService.sideNavState$.subscribe( res => {
      console.log("SideNav Status in sideNavMenu Component>>" + res);
      this.sideNavToggleState = res;

      //hide all the expanded menus
      this.expanded = !this.expanded;

     });
  }
  onItemSelected(item: NavItem) {
    console.log("Item selected>>" + item.displayName);

    if (!item.children || !item.children.length) {
      this.router.navigate([item.route]);

    }
    if (item.children && item.children.length) {
      this.expanded = !this.expanded;
    }
    console.log("Expanded>>" + this.expanded);

  }


}
