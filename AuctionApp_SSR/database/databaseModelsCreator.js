import { Auction } from '../models/auction.js';
import { Offer } from '../models/offer.js';

/**
 * @param {string} name
 * @param {Date} startDateTime
 * @param {Date} endDateTime
 * @param {string} creator
 * @param {number} maxAmount
 * @returns {Promise<Auction>}
 */
export async function createAuction(name, startDateTime, endDateTime, creator, maxAmount) {
    return await Auction.create({
        name,
        startDateTime,
        endDateTime,
        creator,
        maxAmount,
    });
}

/**
 * @param {string} creator
 * @param {number} amount
 * @param {Date} dateTime
 * @param {number} auctionId
 * @returns {Promise<Offer>}
 */
export async function createOffer(creator, amount, dateTime, auctionId) {
    return await Offer.create({
        creator,
        amount,
        dateTime,
        auctionId,
    });
}
