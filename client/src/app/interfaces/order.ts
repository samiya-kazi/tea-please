import { Flavour } from "./flavour"
import { Food } from "./food"

export interface Order {
  userId: string,
  room: string,
  status: string,
  items: OrderItem[],
  date: Date
}

interface OrderItem {
  _id: string,
  food: Food,
  quantity: Number,
  selectedFlavour: Flavour
}