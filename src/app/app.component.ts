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

  constructor(
    private flickr: FlickrService,
  ) {
    this.getFlickrImages();
  }

  getFlickrImages(tags?: string) {
    this.getFlickrImagesSubscription = this.flickr
      .getFlickrImages(tags).subscribe(
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
    console.log('event', event);
    const tags: string = event.tags.join();
    this.getFlickrImages(tags);
  }

  ngOnDestroy() {
    if (this.getFlickrImagesSubscription) this.getFlickrImagesSubscription.unsubscribe();
  }



}
