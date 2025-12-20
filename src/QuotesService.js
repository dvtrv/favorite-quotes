export default class QuotesService {
  constructor(url) {
    this.url = url;
    this.quotes = [];
    this.favoritesIdList = [];
    this.currentQuoteId = null;
  }

  async load() {
    if (this.quotes.length) return;
    try {
      this.quotes = await fetch(this.url).then((r) => r.json());
    } catch (error) {
      throw new Error(
        'Oops! Something went wrong while loading quotes. Please check your internet connection and try again. 🤍'
      );
    }
  }
  getQuoteById(id) {
    return this.quotes.find((quote) => quote.id === id);
  }

  getRandom() {
    const randomNumber = Math.floor(Math.random() * this.quotes.length);
    this.currentQuoteId = this.quotes[randomNumber].id;
    return this.getQuoteById(this.currentQuoteId);
  }

  toggleFavorite() {
    if (this.currentQuoteId == null) return;
    const i = this.favoritesIdList.indexOf(this.currentQuoteId);
    if (i == -1) {
      this.favoritesIdList.push(this.currentQuoteId);
    } else {
      this.favoritesIdList.splice(i, 1);
    }
  }

  removeFavoriteById(quoteId) {
    const i = this.favoritesIdList.indexOf(quoteId);
    if (i !== -1) {
      this.favoritesIdList.splice(i, 1);
    }
  }

  getFavorites() {
    return this.favoritesIdList.reduce((list, id) => {
      list.push({
        id,
        author: this.getQuoteById(id).author,
        quote: this.getQuoteById(id).quote,
      });
      return list;
    }, []);
  }

  isFavoriteIcon() {
    return this.favoritesIdList.includes(this.currentQuoteId);
  }

  isFavoriteElements() {
    return this.currentQuoteId == null;
  }
}
