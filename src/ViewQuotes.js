export default class ViewQuotes {
  constructor() {
    this.currentQuoteId = document.querySelector(".current-quote__id");
    this.currentQuoteText = document.querySelector(".current-quote__text");
    this.currentQuoteAuthor = document.querySelector(".current-quote__author");
    this.btnGenerate = document.querySelector(".btn--generate");
    this.btnFavorite = document.querySelector(".btn--favorite");
    this.favoritesList = document.querySelector(".favorites__list");

    this.errorMessage = document.querySelector(".app__error");
  }

  renderNewQuote(quoteData) {
    this.currentQuoteId.textContent = `#${quoteData.id}`;
    this.currentQuoteText.textContent = `"${quoteData.quote}"`;
    this.currentQuoteAuthor.textContent = `— ${quoteData.author}`;
  }

  renderFavorites(favoriteQuotes) {
    if (favoriteQuotes === null) return;
    this.favoritesList.innerHTML = favoriteQuotes
      .map((quote) => {
        return `<li class="favorites__list-item quote-card">
          <p class="quote-card__text">"${quote.quote}"</p>

          <div class="quote-card__info">
              <div class="quote-card__info-wrapper">
                  <p class="quote-card__author">— ${quote.author}</p>
                  <p class="quote-card__id">#${quote.id}</p>
              </div>
              <button
                  class="quote-card__btn btn btn--delete"
                  type="button"
                  aria-label="Delete quote"
                  data-quote-id="${quote.id}"
              >
                  <svg
                      class="icon icon--delete"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 46 32"
                      fill="none">
                      <path d="M19.9928 11.0333L29.9046 21.0809"/>
                      <path d="M30.0405 11.0333L20.1287 21.0809"/>
                      <path d="M12.5976 4.78003C12.9762 4.28818 13.5617 4 14.1824 4H37.0833C38.1879 4 39.0833 4.89543 39.0833 6V26.1143C39.0833 27.2189 38.1879 28.1143 37.0833 28.1143H14.1824C13.5617 28.1143 12.9762 27.8261 12.5976 27.3343L4.85574 17.2771C4.30217 16.558 4.30217 15.5563 4.85574 14.8372L12.5976 4.78003Z"/>
                  </svg>
              </button>
          </div></li>`;
      })
      .join("");
  }

  deleteFavorite(handler) {
    this.favoritesList.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn--delete");
      if (!btn) return;
      handler(btn.dataset.quoteId);
    });
  }

  renderErrorMessage(message) {
    this.errorMessage.textContent = message;
  }

  bindBtn(handler, btn) {
    btn.addEventListener("click", handler);
  }

  toggleFavoriteBtnIcon(isFavorite) {
    this.btnFavorite.classList.toggle("is-favorite", isFavorite);
  }
}
