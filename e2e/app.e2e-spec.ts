import { MyChatPage } from './app.po';

describe('my-chat App', () => {
  let page: MyChatPage;

  beforeEach(() => {
    page = new MyChatPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
