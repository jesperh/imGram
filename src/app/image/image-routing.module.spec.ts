import { ImageRoutingModule } from './image-routing.module';

describe('ImageRoutingModule', () => {
  let imageRoutingModule: ImageRoutingModule;

  beforeEach(() => {
    imageRoutingModule = new ImageRoutingModule();
  });

  it('should create an instance', () => {
    expect(imageRoutingModule).toBeTruthy();
  });
});
