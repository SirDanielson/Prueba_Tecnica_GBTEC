import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { PhotoSearchParams } from 'src/app/interfaces/requests.interface';
import { UnsplashService } from 'src/app/services/unsplash.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  searchValue: string = '';

  lastScrollPosition = window.scrollY;
  hideNavbar: boolean = false;
  hideSearch: boolean = true;
  nextPage: number = 0;

  constructor(private unsplashService: UnsplashService, private router: Router) {}

  ngOnInit(): void {
    this.unsplashService.currentValueSearch.subscribe((change) => {
      this.searchValue = change;
    });
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        console.log(1);

        this.hideSearch = window.scrollY < 150 || this.router.url !== '/';
      }
    });
  }

  search() {
    if (this.searchValue !== '') {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
      this.unsplashService.currentValueSearch.next(this.searchValue);
      const searchParams: PhotoSearchParams = {
        query: this.searchValue,
        page: this.nextPage,
      };
      this.unsplashService.searchPhotos(searchParams, true);
    }
  }

  resetSearch() {
    this.searchValue = '';
    this.unsplashService.currentValueSearch.next(this.searchValue);
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    const currentScrollPosition = window.scrollY;
    if (currentScrollPosition > this.lastScrollPosition && this.lastScrollPosition !== 0) {
      this.hideNavbar = window.scrollY > 80;
    } else if (currentScrollPosition < this.lastScrollPosition && currentScrollPosition !== 0) {
      this.hideNavbar = false;
    }
    this.hideSearch = window.scrollY < 150 || this.router.url !== '/';

    this.lastScrollPosition = currentScrollPosition;
  }
}
