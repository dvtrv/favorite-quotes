export default class ServiceQuotes {
  constructor() {
    this.appVersion = "0.2.2-alfa";
    this.appState = {};
    this.apiURL = "https://dummyjson.com/quotes/random";
    // this.apiURL ='https://quoteslate.vercel.app/api/quotes/random';
    this.currentQuote = null;
    this.favorites = [];
  }

  async load() {
    try {
      await this.loadAppState();
    } catch (error) {
      throw new Error(`Loading state: ${error.message}.`);
    }
  }

  saveAppState() {
    this.appState.version = this.appVersion;
    this.appState.favorites = this.favorites;
    this.appState.currentQuote = this.currentQuote;
    localStorage.setItem("quotesAppState", JSON.stringify(this.appState));
  }

  async loadAppState() {
    const savedState = localStorage.getItem("quotesAppState");
    if (savedState) {
      this.appState = JSON.parse(savedState);
      this.currentQuote = this.appState.currentQuote;
      this.favorites = Array.isArray(this.appState.favorites) ? this.appState.favorites : [];
    } else {
      await this.setCurrentQuote();
      this.saveAppState();
    }
  }

  async fetchData() {
    try {
      const response = await fetch(this.apiURL);
      if (!response.ok) throw new Error(response.status);
      return await response.json();
    } catch (error) {
      throw new Error(`Fetching data: ${error.message}.`);
    }
  }

  async setCurrentQuote() {
    this.currentQuote = await this.fetchData();
  }

  toggleFavorite() {
    const index = this.favorites.indexOf(this.currentQuote);
    if (index === -1) {
      this.favorites.push(this.currentQuote);
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
    return this.favorites.includes(this.currentQuote);
  }
}
