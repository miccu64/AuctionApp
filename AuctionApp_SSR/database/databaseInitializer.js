import { Auction } from '../models/auction.js';
import { Offer } from '../models/offer.js';
import { sequelize } from './database.js';

export async function initSequelize() {
  await sequelize.authenticate();

  await initModels();
}

async function initModels() {
  await Auction.sync();
  await Offer.sync();

  Auction.hasMany(Offer);
  Offer.belongsTo(Auction);
}
