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
    this.view.renderNewQuote(this.service.qurrentQuote);
    this.updateUI();
  }

  async handlerOnGenerate() {
    await this.service.setQurrentQuote();
    this.view.renderNewQuote(this.service.qurrentQuote);
    this.updateUI();
  }

  handlerOnFavorite() {
    this.service.toggleFavorite();
    this.updateUI();
  }

  handlerOnDelete(quoteId) {
    this.service.deleteFavoriteById(quoteId);
    this.updateUI();
  }

  updateUI() {
    this.view.renderFavorites(this.service.favorites);
    this.view.toggleFavoriteBtnIcon(this.service.isFavorite());
  }
}

const app = new App();
