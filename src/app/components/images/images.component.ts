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

  /**
   * Alters the URL to fetch a higher resolution image.
   *
   * @param {string} url Flickr image url
   *
   * @returns new url
   */
  getHigherResImage(url: string) {
    return url.replace('m.jpg', 'z.jpg');
  }

  /**
   * Splits the Flickr provided author string to fetch just the Author's name
   *
   * @param {string} author Flickr image author
   *
   * @returns author
   */
  getAuthorName(author: string) {
    return author.split('"')[1]
  }

}
