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

  /**
   * Subscribes the function in the Flickr Service to return an array of FlickrImages
   *
   * @returns void
   */
  getFlickrImages(): void {
    this.getFlickrImagesSubscription = this.flickr
      .getFlickrImages(this.savedTags).subscribe(
        (response) => {
          this.flickrImages = response.items;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  /**
   * @param {any} event Event exposed via the search component containing the
   * value of the input bar. Refreshes the Flickr Images
   *
   */
  tagsUpdate(event: any): void {
    this.savedTags = event.tags.join();
    this.getFlickrImages();
  }

  /**
   * Called every time the component is destroyed (route away, app closed). Ensures there are no
   * subscriptions still in memory - implication is larger apps with multiple subscriptions. This
   * can cause unexpected behaviour
   *
   * @returns void
   */
  ngOnDestroy(): void {
    if (this.getFlickrImagesSubscription) this.getFlickrImagesSubscription.unsubscribe();
  }



}
