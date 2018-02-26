import { Component, OnInit, Input } from '@angular/core';

import { FlickrImage } from './../../flickr-image.model';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html'
})
export class ImagesComponent implements OnInit {

  @Input() images: FlickrImage[];

  constructor() { }

  ngOnInit() {
  }

  getHigherResImage(url: string) {
    return url.replace('m.jpg', 'z.jpg');
  }

  getAuthorName(author: string) {
    return author.split('"')[1]
  }

}
