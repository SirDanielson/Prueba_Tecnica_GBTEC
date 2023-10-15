import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PhotoDetailComponent } from 'src/app/components/photo-detail/photo-detail.component';
import { Photo } from 'src/app/interfaces/photos.interface';

@Component({
  selector: 'app-liked-photos',
  templateUrl: './liked-photos.component.html',
  styleUrls: ['./liked-photos.component.scss'],
})
export class LikedPhotosComponent implements OnInit {
  savedPhotos: Photo[] = [];
  selectedPhoto: Photo | undefined;

  constructor(private readonly dialog: MatDialog) {}

  ngOnInit(): void {
    if (localStorage.getItem('savedPhotos')) {
      this.savedPhotos = JSON.parse(localStorage.getItem('savedPhotos')!);
    }
    window.scrollTo(0, 0);
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
  selectPhoto(photo: Photo) {
    this.selectedPhoto = photo;
    this.dialog.open(PhotoDetailComponent, {
      maxWidth: '1100px',
      height: '80%',
      panelClass: 'photo-detail',
      data: {
        photo: this.selectedPhoto,
      },
    });
  }
}
