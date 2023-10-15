import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Photo, SearchRequest } from '../interfaces/photos.interface';
import { ENDPOINTS } from '../constants/endpoints';

@Injectable({
  providedIn: 'root',
})
export class UnsplashService {
  constructor(private http: HttpClient) {}
  currentValueSearch = new BehaviorSubject<string>('');
  newPhotosEmitter = new BehaviorSubject<SearchRequest>({} as any);
  loadingEmitter = new BehaviorSubject<boolean>(false);

  accesKey = 'ClrDCMKNZq8GpG4m-XgmSs4yqbI6Q7g7OvHZV2hEGQU';
  secretKey = 'T8BeunTNz0DaM8eiivZfgWbG8lkw39mUejSmefyf12A';

  baseUrl = 'https://api.unsplash.com';
  endPoints = ENDPOINTS;

  searchPhotos(searchParams: any, emitNewPhotos?: boolean): Promise<SearchRequest> {
    this.loadingEmitter.next(emitNewPhotos!);
    return new Promise((resolve) => {
      this.getPhotos(searchParams).subscribe((data) => {
        setTimeout(() => {
          if (emitNewPhotos) {
            this.newPhotosEmitter.next(data);
          }
          resolve(data);
        }, 500);
      });
    });
  }

  getPhotos(searchParams: any): Observable<SearchRequest> {
    const url = this.baseUrl + this.endPoints.searchPhotos;
    const headers = { Authorization: 'Client-ID ' + this.accesKey };
    const params = searchParams;
    return this.http.get<SearchRequest>(url, { headers, params });
  }
  getRandomPhotos(): Observable<Photo[]> {
    const url = this.baseUrl + this.endPoints.searchRandomPhotos;
    const headers = { Authorization: 'Client-ID ' + this.accesKey };
    const params = { count: 10 };
    return this.http.get<Photo[]>(url, { headers, params });
  }
}
