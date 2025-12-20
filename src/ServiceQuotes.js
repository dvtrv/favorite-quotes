export default class ServiceQuotes {
  constructor() {
    this.apiURL = "https://dummyjson.com/quotes/random";
    // this.apiURL ='https://quoteslate.vercel.app/api/quotes/random';

    this.qurrentQuote = null;
    this.favorites = [];
  }

  async load() {
    await this.setQurrentQuote();
  }

  async fetchData() {
    try {
      const response = await fetch(this.apiURL);
      if (!response.ok) throw new Error(`Response rejected: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.log(error.message);
      throw new Error(`Error when fetching data. Error: ${error.message}`);
    }
  }

  async setQurrentQuote() {
    this.qurrentQuote = await this.fetchData();
  }

  toggleFavorite() {
    const index = this.favorites.indexOf(this.qurrentQuote);
    if (index === -1) {
      this.favorites.push(this.qurrentQuote);
    } else {
      this.favorites.splice(index, 1);
    }
  }

  deleteFavoriteById(quoteId) {
    const index = this.favorites.findIndex((quote) => quote.id == quoteId);
    if (index !== -1) {
      this.favorites.splice(index, 1);
    }
  }

  isFavorite() {
    return this.favorites.includes(this.qurrentQuote);
  }
}
