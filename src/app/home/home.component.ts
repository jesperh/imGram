import { Component, OnInit } from '@angular/core';
;
import {GalleryService} from "../gallery/gallery.service";
import {ImageService} from "../image/image.service";
import {getRandomElementFromArray} from "../utilities/utils";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  splashImages: any[] = [];
  isLoading: boolean = false;
  errorMsg: string;

  constructor(private galleryService: GalleryService, private imageService: ImageService) { }

  ngOnInit() {
    // const source = of(this.getRandomInt(5000), this.getRandomInt(5000), this.getRandomInt(5000));
    // const takeThreeImages = source.pipe(take(3));
    // takeThreeImages.subscribe(val => this.getPhoto(val));
    this.insertRandomImagesToSplash(3);
  }
  //
  // getPhoto(id: number) {
  //   this.photosService.getSimplePhoto(id)
  //     .subscribe((photo: Photo) => this.splashImages.push(photo));
  // }
  //
  // private getRandomInt(max) {
  //   return Math.floor(Math.random() * Math.floor(max));
  // }

  insertRandomImagesToSplash(count: number = 1) {
    this.isLoading = true;
    // Get the images from the "Viral" gallery.
    this.galleryService.getMainGallery()
      .subscribe((gallery: any) => {

        let albumsWithImages = gallery.data.filter(album => this.filterAlbum(album));

        for(let i = 0; i < count; i++) {
          const randImg = getRandomElementFromArray(albumsWithImages);
          // Remove the selected image from the array,
          // so it won't get randomed again.
          albumsWithImages = albumsWithImages.filter(album => album.id != randImg.id);
          this.splashImages.push(randImg);
        }

        this.isLoading = false;
        this.errorMsg = undefined;
      }, error => {
        this.isLoading = false;
        this.errorMsg = error.message;
      });
  }

  getThumbnail(album) {
    return this.imageService.getThumbnailUrl(album.cover, "m");
  }

  private filterAlbum(album) {
    // Filter out animated images.
    // Also for aesthetic reasons, the aspect ratio of the image
    // needs to be close to 1 (= square). Images with very
    // different aspect ratio look a little silly on the home page.
    return album.cover && !album.animated && this.filterByAspectRatio(album.images[0]);
  }

  private filterByAspectRatio(image) {
    const aspectRatio = image.width / image.height;
    return aspectRatio >= 0.7 && aspectRatio <= 1.3;
  }
}
