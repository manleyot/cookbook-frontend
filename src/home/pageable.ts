
export class Pageable {

  currentPage:number = 0;
  pageSize:number = 10;
  enableNext:boolean = true;
  enablePrev:boolean = false;

  previousPage() {
    if (this.enablePrev) {
      this.currentPage -= 1;
      this.onPreviousPage();
    }
  }

  nextPage() {
    if (this.enableNext) {
      this.currentPage += 1;
      this.onNextPage();
    }
  }

  getPagerClass(enabled:boolean) {
    return {
      disabled: !enabled
    }
  }

  onNextPage() {
  }

  onPreviousPage() {
  }
}
