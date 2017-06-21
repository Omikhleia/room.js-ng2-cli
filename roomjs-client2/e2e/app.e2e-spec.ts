import { RoomjsClientPage } from './app.po';

describe('roomjs-client App', function() {
  let page: RoomjsClientPage;

  beforeEach(() => {
    page = new RoomjsClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('RoomJS angular2 client');
  });
});
