import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Flavour } from 'src/app/interfaces/flavour';
import { Food } from 'src/app/interfaces/food';
import { ApiClientService } from 'src/app/services/api-client.service';

@Component({
  selector: 'app-add-item-form',
  templateUrl: './add-item-form.component.html',
  styleUrls: ['./add-item-form.component.css']
})
export class AddItemFormComponent implements OnInit {

  food : Food[] = [];
  flavours : Flavour[] = [];
  selectedFood? : Food;
  selectedFlavour? : Flavour;

  addItemForm = this.fb.group({
    foodId: '',
    selectedFlavourId: '',
    quantity: 1
  })

  constructor(private api: ApiClientService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getFood();
    this.addItemForm.valueChanges.subscribe(res => {
      this.selectedFood = this.food.filter(food => food._id === res.foodId)[0];

      if(this.selectedFood){
        this.flavours = this.selectedFood.flavours;
        this.selectedFlavour = this.selectedFood.flavours.filter(flavour => flavour._id === res.selectedFlavourId)[0];
      }
    })
  }

  getFood () {
    this.api.getAllFood().subscribe(food => this.food = food);
  }

  handleChange(e: Event) {
    console.log(e)
  }

  handleSubmit() {
    if(this.selectedFood && this.addItemForm.value.quantity && this.selectedFlavour) {
      const newItem = {food: this.selectedFood, quantity: this.addItemForm.value.quantity, selectedFlavour: this.selectedFlavour}
      const cartStr = localStorage.getItem('cart');
      if(cartStr) {
        const prevCart = JSON.parse(cartStr);
        const newCart = [...prevCart, newItem]
        console.log(newCart)
        localStorage.setItem('cart', JSON.stringify(newCart));
      } else {
        localStorage.setItem('cart', JSON.stringify([newItem]));
      }
    }

    this.addItemForm.reset();
    this.addItemForm.setValue({foodId: '', selectedFlavourId: '', quantity: 1});
  }

}
