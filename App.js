import ServiceQuotes from "./src/ServiceQuotes.js";
import ViewQuotes from "./src/ViewQuotes.js";

class App {
  constructor() {
    this.service = new ServiceQuotes();
    this.view = new ViewQuotes();
    this.view.bindBtn(() => this.handlerOnGenerate(), this.view.btnGenerate);
    this.view.bindBtn(() => this.handlerOnFavorite(), this.view.btnFavorite);
    this.view.deleteFavorite((quoteId) => this.handlerOnDelete(quoteId));
    this.init();
  }

  async init() {
    await this.service.load();
    this.view.renderNewQuote(this.service.currentQuote);
    this.updateUI();
  }

  async handlerOnGenerate() {
    await this.service.setCurrentQuote();
    this.view.renderNewQuote(this.service.currentQuote);
    this.updateUI();
    this.service.saveAppState();
  }

  handlerOnFavorite() {
    this.service.toggleFavorite();
    this.updateUI();
    this.service.saveAppState();
  }

  handlerOnDelete(quoteId) {
    this.service.deleteFavoriteById(quoteId);
    this.updateUI();
    this.service.saveAppState();
  }

  updateUI() {
    this.view.renderFavorites(this.service.favorites);
    this.view.toggleFavoriteBtnIcon(this.service.isFavorite());
  }
}

const app = new App();
