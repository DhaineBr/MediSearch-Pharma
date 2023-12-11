export interface Medicine {
  id: number,
  itemNumber: string,
  name: string,
  category: string,
  price: number,
  quantity: number,
  expirationDate: Date,
  pharmacyId: number,
  selected?: boolean,
  createdAt: Date,
  reservationDate: Date
}
