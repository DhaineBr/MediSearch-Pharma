export interface Medicine {
  id: string,
  itemNumber: string,
  name: string,
  category: string,
  price: number,
  quantity: number,
  expirationDate: string,
  pharmacyId: number,
  selected?: boolean
}
