import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterStateSnapshot, NavigationEnd } from '@angular/router';
import { Category } from './category/category';
import { HomeService } from './shared/services/home.service';
import { AuthService } from './shared/services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  categories: Category[] = [];
  loginStatus = false;
  url: string;
  constructor(private api: HomeService, private authService: AuthService, private router: Router, private route: ActivatedRoute) {

    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.url = event.url
          this.checkUrl()
        }
      });
  }

  ngOnInit() {
    // this.authService.isLoggedIn.subscribe((status: any) => {
    //   console.log(status);
    //   if (status === true) {
    //     this.loginStatus = true;
    //   } else {
    //     this.loginStatus = false;
    //   }
    // });
    this.api.getCategories()
      .subscribe((res: any) => {
        this.categories = res;
        console.log(this.categories);
        console.log(this.loginStatus)
      }, err => {
        console.log(err);
      });
  }

  checkUrl() {
    this.authService.checkToken();
    if (this.url === '/admin') {
      this.loginStatus = true;
    }
    else {
      this.loginStatus = false;
    }
    console.log(this.loginStatus)
  }

  logout() {
    this.authService.logout()
      .subscribe((res: any) => {
        this.router.navigate(['/']);
      }, err => {
        console.log(err);
      });
  }
}
