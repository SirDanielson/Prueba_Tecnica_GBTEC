import { Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { Photo } from 'src/app/interfaces/photos.interface';

@Component({
  selector: 'app-photo-detail',
  templateUrl: './photo-detail.component.html',
  styleUrls: ['./photo-detail.component.scss'],
})
export class PhotoDetailComponent {
  photo: Photo = {} as any;
  publishingDate: string = '';
  constructor(
    public dialogRef: MatDialogRef<PhotoDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.photo = data.photo;
    this.publishingDate = moment(this.photo.created_at).format('DD MMMM YYYY');
  }

  closePanel() {
    this.dialogRef.close();
  }
}
