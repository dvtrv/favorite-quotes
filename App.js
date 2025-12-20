import QuotesService from './src/QuotesService.js';
import QuotesView from './src/QuotesView.js';

class App {
  constructor() {
    this.service = new QuotesService('./quotes.json');
    this.view = new QuotesView();
    this.view.onFavorite(() => this.handleFavorite());
    this.view.onGenerate(() => this.handleGenerate());
    this.view.onDeleteFavorite((quoteId) => this.handleDeleteFavorite(quoteId));
  }

  async handleGenerate() {
    try {
      await this.service.load();
      this.view.setHidden(true);

      setTimeout(() => {
        this.view.showQuote(this.service.getRandom());
        this.view.setHidden(false);
        this.updateFavoritesUI();
      }, 400);
    } catch (error) {
      this.view.showError(error);
    }
  }

  handleFavorite() {
    this.service.toggleFavorite();
    this.updateFavoritesUI();
  }

  handleDeleteFavorite(quoteId) {
    this.service.removeFavoriteById(quoteId);
    this.updateFavoritesUI();
  }

  updateFavoritesUI() {
    this.view.renderFavoriteList(this.service.getFavorites());
    this.view.switchFavoriteBtn(this.service.isFavoriteIcon());
    this.view.renderFavoriteElements(this.service.isFavoriteElements());
  }
}

const app = new App();
