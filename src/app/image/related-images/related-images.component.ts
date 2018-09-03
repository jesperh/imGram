import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {ImageService} from "../image.service";

@Component({
  selector: 'app-related-images',
  templateUrl: './related-images.component.html',
  styleUrls: ['./related-images.component.scss']
})
export class RelatedImagesComponent implements OnInit {
  @Input() images: any[];
  constructor(private imageService: ImageService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    const chng = changes['images'];
    this.images = chng.currentValue;
  }

  getImageUrl(album) {
    return this.imageService.getThumbnailUrl(album.images[0].id, "b");
  }
}
