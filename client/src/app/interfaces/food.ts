import { Flavour } from "./flavour"

export interface Food {
  _id: string
  name: string,
  flavours: Flavour[];
  size: string
}