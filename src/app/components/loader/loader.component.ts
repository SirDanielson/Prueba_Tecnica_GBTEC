import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent {
  @Input() loaderSize: number | undefined;
  @Input() loaderThickness: number | undefined;
  constructor() {}
}
