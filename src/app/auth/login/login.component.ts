import {Component, OnDestroy, OnInit} from "@angular/core";
import { NgForm } from "@angular/forms";
import {AuthService} from "../auth.service";
import {Title} from "@angular/platform-browser";
import { Subscription } from "rxjs";

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading = false;
  private authStatusSub: Subscription;

  constructor(public authService: AuthService, private titleService: Title) {}

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false;
      }
    );
  }

  onAdminLogin(form: NgForm) {
    if(form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.login(form.value.ad, form.value.password);
  }

  setDocTitle(title: string) {
    console.log('current title:::::' + this.titleService.getTitle());
    this.titleService.setTitle(title);
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
