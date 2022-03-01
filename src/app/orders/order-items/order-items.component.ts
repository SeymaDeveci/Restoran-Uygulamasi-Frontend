import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Item } from 'src/app/shared/item.model';
import { ItemService } from 'src/app/shared/item.service';
import { OrderItem } from 'src/app/shared/order-item.model';
import { OrderService } from 'src/app/shared/order.service';

@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styleUrls: ['./order-items.component.css']
})
export class OrderItemsComponent implements OnInit {

  formData : OrderItem = new OrderItem();
  itemList!: Item[];
  isValid: boolean = true;

  constructor(public dialogRef: MatDialogRef<OrderItemsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private itemService: ItemService,
    private orderService: OrderService) { }

  ngOnInit(): void {

    this.itemService.getItemList().then(res=> this.itemList = res as Item[]);
    
    console.log(this.itemList);
    console.log("this.data", this.data);

    if(this.data == null) {
      this.formData={
      OrderItemId : 0,
      OrderId : this.data.OrderId,
      ItemId : 0,
      ItemName : '',
      Price : 0,
      Quantity : 0,
      Total : 0
    }
   }else {
     this.formData = Object.assign({}, this.orderService.orderItemModel[this.data.orderItemIndex]);
   }
  }

  updatePrice(sItem: any){
    if(sItem.selectedIndex==0){
      this.formData.Price = 0;
      this.formData.ItemName= '';
      this.formData.Total = 0;
    }else{
      this.formData.Price=this.itemList[sItem.target.selectedIndex].price;
      this.formData.ItemName=this.itemList[sItem.target.selectedIndex].name;
      this.formData.Total = 0;
    }
    this.updateTotal();
  }
  updateTotal(){
    if(this.formData.Quantity==undefined || this.formData.Price==undefined){
      this.formData.Total=0;
    }else{
    this.formData.Total= parseFloat((this.formData.Quantity * this.formData.Price).toFixed(2));
    }
  }
  onSubmit(form: NgForm){
    if (this.validateForm(form.value)) 
     {
      if (this.data.orderItemIndex == null) {
        this.orderService.orderItemModel.push(form.value);
      }
      else {
        this.orderService.orderItemModel[this.data.orderItemIndex] = form.value;
      }
      console.log("this.orderService.orderItemModel=>", this.orderService.orderItemModel);
      this.dialogRef.close();
     }
  }
  validateForm(formData: OrderItem) {
    this.isValid = true;

    if (formData.ItemId == 0)
      this.isValid = false;
    else if (formData.Quantity == 0)
      this.isValid = false;
    return this.isValid;
  }
  close() {
    this.dialogRef.close();
  }
}
