import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedImagesComponent } from './related-images.component';

describe('RelatedImagesComponent', () => {
  let component: RelatedImagesComponent;
  let fixture: ComponentFixture<RelatedImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatedImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatedImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
