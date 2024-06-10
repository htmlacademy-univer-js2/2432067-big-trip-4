import { remove, render, replace } from '../framework/render.js';
import TripInfoModel from '../model/trip-info-model.js';
import TripInfoView from '../view/trip-info-view.js';

export default class TripInfoPresenter{
  #tripInfoComponent;
  #offersModel;
  #destinationsModel;
  #tripMain;
  #model;

  constructor({tripMain, offersModel, destinationsModel}){
    this.#tripMain = tripMain;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#model = null;
  }

  init(points){
    const prevTripInfoComponent = this.#tripInfoComponent;

    this.#model = new TripInfoModel({
      points: points,
      offersModel: this.#offersModel,
      destinationsModel: this.#destinationsModel,
    });

    this.#tripInfoComponent = new TripInfoView(this.#model.info);

    if (!prevTripInfoComponent) {
      render(this.#tripInfoComponent, this.#tripMain);

      return;
    }

    replace(this.#tripInfoComponent, prevTripInfoComponent);
    remove(prevTripInfoComponent);
  }

  destroy = () => {
    remove(this.#tripInfoComponent);
  };
}
