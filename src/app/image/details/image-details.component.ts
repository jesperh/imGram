import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {ImageService} from '../image.service';
import {MatSnackBar} from '@angular/material';
import {AlbumsService} from '../../albums/albums.service';
import {GalleryService} from "../../gallery/gallery.service";
import {getRandomElementFromArray} from "../../utilities/utils";
import {Observable} from "rxjs";

@Component({
  selector: 'app-image-details',
  templateUrl: './image-details.component.html',
  styleUrls: ['./image-details.component.scss']
})
export class ImageDetailsComponent implements OnInit {

  isLoading: boolean = false;
  album: any;
  image: any;
  imageSrc: string;
  relatedImages: any[];
  errorMsg: string;

  constructor(
    public snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private location: Location,
    private imageService: ImageService,
    private albumsService: AlbumsService,
    private galleryService: GalleryService
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.getAlbum(id);
    });
  }

  getAlbum(id: string) {
    this.albumsService.getAlbum(id)
      .subscribe((albumResponse: any) => {
        this.album = albumResponse.data;
        if(this.album == null || !this.album.images.length) {
          this.errorMsg = "There are no images in the given album.";
          return;
        }
        this.image = this.album.images[0];
        this.imageSrc = this.imageService.getThumbnailUrl(this.image.id, "h");
        this.setRelatedImages(this.album);
        this.isLoading = false;
        this.errorMsg = undefined;
      })
  }

  setRelatedImages(album) {
    this.getRandomImages()
      .subscribe(images => this.relatedImages = images);
  }

  getRandomImages(): Observable<any[]> {
    return Observable.create(observer => {
      const images = [];
      this.galleryService.getMainGallery()
        .subscribe((gallery: any) => {
          let albumsWithImages = gallery.data.filter(album => album.cover && !album.animated);
          for (let i = 0; i < 10; i++) {
            const album = getRandomElementFromArray(albumsWithImages);
            images.push(album);
          }
          observer.next(images);
          observer.complete();
        });
    });
  }


  //
  // getPhoto(id): void {
  //   this.photosService.getPhoto(id)
  //     .subscribe(photo => {
  //       this.photo = photo;
  //       this.getRelatedPhotos(photo);
  //     });
  // }

  copy() {
    const dummy = document.createElement('input');
    const text = window.location.href;

    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);

    this.snackBar.open('Url copied to clipboard!', 'OK', {
      duration: 2000
    });
  }
  //
  // getRelatedPhotos(photo: Photo) {
  //   this.albumsService.getPhotosInAlbum(photo.albumId, 10).subscribe((photos: any) => {
  //     console.log(photos);
  //     this.relatedPhotos = photos;
  //   });
  // }

  goBack() {
    this.location.back();
  }
}
