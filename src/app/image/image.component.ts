import { Component, OnInit } from '@angular/core';

import {PageEvent} from "@angular/material";
import {ImageService} from "./image.service";
import {GalleryService} from "../gallery/gallery.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
  host: {
    '(window:resize)': 'onResize($event)'
  }
})
export class ImageComponent implements OnInit {

  images: any[] = [];
  listImages: any[] = [];
  thumbnailWidth = 150;
  gridColCount = 8;
  currentPage = 1;
  viewMode: 'grid'|'list' = 'list';
  displayedColumns: string[] = ['photo', 'title', 'open'];
  pageSize = 10;
  pageSizeOptions: number[] = [10];
  // MatPaginator Output
  pageEvent: PageEvent;
  errorMsg: string;
  isLoading: boolean = false;
  isLoadingMoreImages: boolean = false;


  constructor(private imageService: ImageService, private galleryService: GalleryService) { }

  ngOnInit() {
    this.loadInitialImages();
  }

  // Window resizing needs to be listened,
  // so that we can fit maximum amount of photos
  // per row.
  onResize(event) {
    const contentDivWidth = document.getElementById('content').offsetWidth;
    console.log(contentDivWidth); // window width
    this.gridColCount = Math.floor(contentDivWidth / this.thumbnailWidth);
  }

  setViewMode(viewMode: 'grid'|'list') {
    if(viewMode === "grid" && this.listImages.length === 0) {
      this.listImages = this.images.slice(0, 10);
    }
    this.viewMode = viewMode;
  }

  loadInitialImages() {
    this.isLoading = true;
    this.errorMsg = undefined;
    // Get the images from the "Viral" gallery.
    this.galleryService.getMainGallery()
      .subscribe((galleryResponse: any) => {
        const albums = this.parseGalleryResponse(galleryResponse);
        this.images = albums;
        this.isLoading = false;
      }, error => {
        this.errorMsg = error.message;
        this.isLoading = false;
      });
  }

  getThumbnail(album, size = "m") {
    return this.imageService.getThumbnailUrl(album.cover, size);
  }


  loadMoreToGrid() {
    this.loadMoreImages().subscribe();
  }

  loadMoreImages() {
    return Observable.create(observer => {

      this.isLoadingMoreImages = true;
      this.galleryService.getPageFromMainGallery(this.currentPage + 1)
        .subscribe(galleryResponse => {
          const albums = this.parseGalleryResponse(galleryResponse);
          if (albums.length === 0) {
            this.isLoadingMoreImages = false;
            observer.error("No more images.");
          }
          this.images = [...this.images, ...albums];
          this.currentPage++;
          this.isLoadingMoreImages = false;
          observer.next();
          observer.complete();
        }, error => {
          this.errorMsg = error.message;
          this.isLoading = false;
          observer.error(error.message);
        });
    });
  }

  onPaginateChange(event) {
    this.pageEvent = event;
    // There usually are more images loaded to the state
    // of this component, than the amount that is requested
    // in the list view. Check whether more images need to be
    // loaded from the API or if images can be retrieved from state.
    if( ((event.pageIndex + 1) * this.pageSize) > this.images.length) {
      this.loadMoreImages().subscribe(x => {
        const start = event.pageIndex * 10;
        const end = start + this.pageSize;
        this.listImages = [...this.images.slice(start, end)];
      });
    } else {
      const start = event.pageIndex * 10;
      const end = start + this.pageSize;
      this.listImages = [...this.images.slice(start, end)];
    }
    console.log(this.pageEvent);
    //this.getPhotos(event.pageIndex + 1);
  }

  private parseGalleryResponse(galleryResponse) {
    if(!galleryResponse.data || galleryResponse.data.length === 0) {
      this.errorMsg = "There are no images.";
      return [];
    }
    return galleryResponse.data.filter(album => this.filterAlbum(album));
  }

  private filterAlbum(album) {
    // Filter out animated images.
    return album.images && !album.images[0].animated;
  }
}
