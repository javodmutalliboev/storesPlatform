import {Component, OnDestroy, OnInit} from "@angular/core";
import {Title} from "@angular/platform-browser";
import { Subscription } from "rxjs";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  adminIsAuthenticated = false;
  private authListenerSubs: Subscription;

  constructor(private titleService: Title, private authService: AuthService) {}

  ngOnInit() {
    this.adminIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener().subscribe(isAuthenticated => {
        this.adminIsAuthenticated = isAuthenticated;
      });
  }

  onLogout() {
    this.authService.logout();
  }

  setDocTitle(title: string) {
    console.log('current title:::::' + this.titleService.getTitle());
    this.titleService.setTitle(title);
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}
