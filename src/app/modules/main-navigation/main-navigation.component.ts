import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';


@Component({
  selector: 'main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.scss']
})
export class MainNavigationComponent implements OnInit {
  isCollapsed: boolean = false;
  constructor(private authService: AuthService) { }
  ngOnInit(): void {
    this.authService.getProfile().subscribe((response) => {
      console.log(response);
    });
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }


  isButtonActive: boolean = false;

  setButtonActive(isActive: boolean) {
    this.isButtonActive = isActive;
  }





}
