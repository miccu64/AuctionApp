export function isAuctionActive(auction) {
  return new Date(auction.getDataValue('endDateTime')) >= new Date()
}