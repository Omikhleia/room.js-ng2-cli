import { browser, element, by } from 'protractor';

export class RoomjsClientPage {

  navigateTo() {
    browser.waitForAngularEnabled(false);

    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}
