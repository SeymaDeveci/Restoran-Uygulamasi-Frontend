import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog,MatDialogConfig } from '@angular/material/dialog';
import { Customer } from 'src/app/shared/customer.model';
import { CustomerService } from 'src/app/shared/customer.service';
import { OrderItem } from 'src/app/shared/order-item.model';
import { Order } from 'src/app/shared/order.model';
import { OrderService } from 'src/app/shared/order.service';
import { OrderItemsComponent } from '../order-items/order-items.component';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  isValid: boolean = true;
  orderModel : Order = new Order();
  orderItemModel : Array<OrderItem> = new Array<OrderItem>();
  customerList!: Customer[];
  
  constructor(private orderService: OrderService, 
    private dialog: MatDialog,
    private customerService: CustomerService,
    private toastr: ToastrService,
    private route: Router) { 

    }

  ngOnInit(): void {
    this.orderItemModel = this.orderService.orderItemModel;
    this.customerService.GetCustomerList().then(res => this.customerList = res as Customer[]);
  }

  resetForm(form?: NgForm | null | undefined) {
    if (form === null)
      form!.resetForm();
    this.orderModel = {
      orderId: 0,
      orderNo: Math.floor(100000 + Math.random() * 900000).toString(),
      customerId: 0,
      paymentMethod: '',
      grandTotal: 0,
      customerName:''
    };
    this.orderItemModel = [];
  }

  AddOrEditOrderItem(orderItemIndex:any,orderId:any) : void{ //Hem ekleme hem güncelleme
    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus=true;
    dialogConfig.disableClose=true;
    dialogConfig.width="550px";
    dialogConfig.height="500px";
    dialogConfig.data = { orderItemIndex,orderId };
    this.dialog.open(OrderItemsComponent, dialogConfig).afterClosed().subscribe(res => {
      this.updateGrandTotal();
    });
   
  }

  DeleteOrderItem(orderItemIndex: any, orderId: any) {
    this.orderService.orderItemModel.splice(orderItemIndex, 1);
    this.updateGrandTotal();
  }
  updateGrandTotal() {
    this.orderModel.grandTotal = this.orderService.orderItemModel.reduce((prev, curr) => {
      return prev + curr.Total;
    }, 0);
    this.orderModel.grandTotal = parseFloat(this.orderModel.grandTotal.toFixed(2));
  }
  validateForm() {
    this.isValid = true;
    if (this.orderModel.customerId == 0 || this.orderModel.customerId == undefined) {
      this.isValid = false;
    } else if (this.orderItemModel.length == 0) {
      this.isValid = false;
    }
    return this.isValid;
  }

  onSubmit(form: NgForm){
    if(this.validateForm()){
      this.orderService.SaveOrder(this.orderModel).subscribe(res => {
        this.resetForm();
        this.toastr.success('Siparişiniz başarıyla oluştu.','Tebrikler!');
        this.route.navigate(['/orders'])
      });
    }
  }

}
