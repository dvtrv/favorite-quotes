export default class QuotesView {
  constructor() {
    this.quotesSection = document.querySelector('.quotes-section');
    this.errorMessage = document.querySelector('.error-message');
    this.quoteEl = document.querySelector('.quote-text');
    this.quoteAuthorEl = document.querySelector('.quote-author');
    this.generateBtn = document.querySelector('.generate-btn');
    this.favoriteBtn = document.querySelector('.favorite-btn');
    this.cardsWrapper = document.querySelector('.cards-wrapper');
    this.favoriteIcon = document.querySelector('.favorite-icon');
    this.favoriteSection = document.querySelector('.favorite-section');
  }

  onGenerate(handler) {
    this.generateBtn.addEventListener('click', handler);
  }

  onFavorite(handler) {
    this.favoriteBtn.addEventListener('click', handler);
  }

  onDeleteFavorite(handler) {
    this.cardsWrapper.addEventListener('click', (e) => {
      const btn = e.target.closest('.delete-btn');
      if (!btn) return;

      const quoteId = btn.dataset.quoteId;
      handler(quoteId);
    });
  }

  showQuote({ quote, author }) {
    this.quoteEl.textContent = quote;
    this.quoteAuthorEl.textContent = `— ${author}`;
  }

  setHidden(isHidden) {
    this.quoteEl.classList.toggle('hide', isHidden);
    this.quoteAuthorEl.classList.toggle('hide', isHidden);
  }

  renderFavoriteElements(isFavoriteElements) {
    this.favoriteBtn.classList.toggle('dn', isFavoriteElements);
    this.favoriteSection.classList.toggle('dn', isFavoriteElements);
  }

  switchFavoriteBtn(isFavoriteIcon) {
    this.favoriteIcon.classList.toggle('favorite-icon-active', isFavoriteIcon);
  }

  renderFavoriteList(favorites) {
    const favoritesList = favorites
      .map((e) => {
        return `<li class="fav-card">
              <p class="fav-card-quote">"${e.quote}"</p>
              <p class="fav-card-author">— ${e.author}</p>
                <button class="delete-btn" data-quote-id="${e.id}">
                  <svg class="delete-icon" viewBox="0 0 18 18">
                    <path d="M0.707031 0.707031L8.70703 8.70703M8.70703 8.70703L16.707 16.707M8.70703 8.70703L16.707 0.707031M8.70703 8.70703L0.707031 16.707"/>
                  </svg>
                </button>
              </li>`;
      })
      .join('');
    this.cardsWrapper.innerHTML = favoritesList;
  }

  showError(error) {
    this.errorMessage.textContent = `${error.message}`;
    this.errorMessage.classList.remove('dn');
    setTimeout(() => this.errorMessage.classList.add('dn'), 4000);
  }
}
