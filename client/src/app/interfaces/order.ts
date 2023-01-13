import { Flavour } from "./flavour"
import { Food } from "./food"

export interface Order {
  _id: string,
  userId: string,
  room: string,
  status: string,
  items: OrderItem[],
  date: Date
}

export interface OrderItem {
  _id: string,
  food: Food,
  quantity: Number,
  selectedFlavour: Flavour
}