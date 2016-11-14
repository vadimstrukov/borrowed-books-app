import { BorrowedBooksAppPage } from './app.po';

describe('borrowed-books-app App', function() {
  let page: BorrowedBooksAppPage;

  beforeEach(() => {
    page = new BorrowedBooksAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
