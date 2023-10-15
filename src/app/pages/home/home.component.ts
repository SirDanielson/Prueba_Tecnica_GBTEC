import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PhotoDetailComponent } from 'src/app/components/photo-detail/photo-detail.component';
import { Photo } from 'src/app/interfaces/photos.interface';
import { PhotoSearchParams } from 'src/app/interfaces/requests.interface';
import { UnsplashService } from 'src/app/services/unsplash.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  searchValue: string = '';
  lastSearchValue: string = '';
  nextPage: number = 1;
  photosList: Photo[] = [];
  savedPhotos: Photo[] = [];
  selectedPhoto: Photo | undefined;
  loadingPhotos: boolean = false;
  hasReachedBottom: boolean = false;

  constructor(
    private unsplashService: UnsplashService,
    private elementRef: ElementRef,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('savedPhotos')) {
      this.savedPhotos = JSON.parse(localStorage.getItem('savedPhotos')!);
    }

    this.unsplashService.currentValueSearch.subscribe((newValue) => {
      this.searchValue = newValue;
    });
    this.unsplashService.newPhotosEmitter.subscribe((newPhotos) => {
      if (newPhotos.results && newPhotos.results?.length > 0) {
        this.photosList = [...newPhotos.results];
      } else {
        this.photosList = [];
      }
    });
    this.unsplashService.loadingEmitter.subscribe((loading) => {
      if (loading) {
        this.photosList = [];
        this.loadingPhotos = loading;
      }
    });

    if (this.searchValue !== '') {
      this.searchPhotos(this.searchValue, true);
    } else {
      this.searchRandomPhotos();
    }
  }

  searchRandomPhotos() {
    this.unsplashService.getRandomPhotos().subscribe((data) => {
      this.photosList.push(...data);
      this.hasReachedBottom = false;
    });
  }

  searchPhotos(searchParam: string, resetList?: boolean) {
    if (searchParam === '') {
      return;
    }
    this.lastSearchValue = this.searchValue;
    if (resetList) {
      this.loadingPhotos = true;
      this.photosList = [];
    }
    this.unsplashService.currentValueSearch.next(this.searchValue);

    const searchParams: PhotoSearchParams = {
      query: searchParam,
      page: this.nextPage,
    };
    this.unsplashService.searchPhotos(searchParams).then((result) => {
      this.loadingPhotos = false;
      if (result.results) {
        this.nextPage += 1;
        this.checkSavedPhotos(result.results);
        this.photosList.push(...result.results);
        this.hasReachedBottom = false;
      }
    });
  }

  selectPhoto(photo: Photo) {
    this.selectedPhoto = photo;
    this.dialog.open(PhotoDetailComponent, {
      maxWidth: '1100px',
      height: '90%',
      panelClass: 'photo-detail',
      data: {
        photo: this.selectedPhoto,
      },
    });
  }

  savePhoto(newPhoto: Photo) {
    const foundIdIndex = this.savedPhotos.findIndex((photo) => photo.id === newPhoto.id);
    if (foundIdIndex === -1) {
      this.savedPhotos.push(newPhoto);
      newPhoto.saved = true;
      newPhoto.likes ? (newPhoto.likes += 1) : 1;
    } else {
      this.savedPhotos.splice(foundIdIndex, 1);
      newPhoto.saved = false;
      newPhoto.likes ? (newPhoto.likes -= 1) : 0;
    }
    localStorage.setItem('savedPhotos', JSON.stringify(this.savedPhotos));
  }

  checkSavedPhotos(photosList: Photo[]) {
    const savedPhotoIds = this.savedPhotos.map((photo) => photo.id);
    photosList.forEach((photo) => {
      if (photo.id && savedPhotoIds.includes(photo.id)) {
        photo.saved = true;
      }
    });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = this.elementRef.nativeElement.offsetHeight;
    if (scrollPosition + windowHeight >= documentHeight - 600 && !this.hasReachedBottom) {
      this.hasReachedBottom = true;
      if (this.searchValue !== '') {
        this.searchPhotos(this.lastSearchValue, false);
      } else {
        this.searchRandomPhotos();
      }
    }
  }
}
