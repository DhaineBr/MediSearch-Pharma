import { Component } from '@angular/core';


@Component({
  selector: 'main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.scss']
})
export class MainNavigationComponent {
  isCollapsed: boolean = false;

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }


  isButtonActive: boolean = false;

  setButtonActive(isActive: boolean) {
    this.isButtonActive = isActive;
  }





}
