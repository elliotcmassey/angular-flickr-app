import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { FlickrImage } from './flickr-image.model';

import { FlickrService } from './flickr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  getFlickrImagesSubscription: Subscription;

  flickrImages: FlickrImage[] = [];

  savedTags: string = '';

  constructor(
    private flickr: FlickrService,
  ) {
    this.getFlickrImages();
  }

  getFlickrImages() {
    this.getFlickrImagesSubscription = this.flickr
      .getFlickrImages(this.savedTags).subscribe(
        (response) => {
          console.log(response);
          this.flickrImages = response.items;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  tagsUpdate(event: any) {
    this.savedTags = event.tags.join();
    this.getFlickrImages();
  }

  ngOnDestroy() {
    if (this.getFlickrImagesSubscription) this.getFlickrImagesSubscription.unsubscribe();
  }



}
