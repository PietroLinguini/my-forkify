import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  _data;

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', e => {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkupButton(type, page) {
    page = Number(page);

    if (type === 'back') {
      return `
        <button data-goto="${
          page - 1
        }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${page - 1}</span>
        </button>
      `;
    }
    if (type === 'forward') {
      return `
        <button data-goto="${
          page + 1
        }" class="btn--inline pagination__btn--next">
          <span>Page ${page + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
      `;
    }
  }

  _generateMarkup() {
    const curPage = Number(this._data.page);
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._generateMarkupButton('forward', curPage);
    }

    // Last page

    if (curPage === numPages && numPages > 1) {
      return this._generateMarkupButton('back', curPage);
    }

    // Other page
    if (curPage < numPages) {
      return `${this._generateMarkupButton('back', curPage)} 
        ${this._generateMarkupButton('forward', curPage)}`;
    }

    // Page 1, and there are NO other pages
    return '';
  }
}

export default new PaginationView();
