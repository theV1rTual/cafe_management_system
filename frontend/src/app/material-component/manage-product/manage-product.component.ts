import { ConfirmationComponent } from './../dialog/confirmation/confirmation.component';
import { ProductComponent } from './../dialog/product/product.component';
import { GlobalConstants } from './../../shared/global-constants';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SnackbarService } from './../../services/snackbar.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { identifierModuleUrl } from '@angular/compiler';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss']
})
export class ManageProductComponent implements OnInit {

  displayedColumns:string[] = ['name', 'categoryName', 'description', 'price', 'edit']
  dataSource: any;
  responseMessage: any;

  constructor(
    private productService: ProductService,
    private dialog: MatDialog,
    private snackbarService: SnackbarService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.tableData()
  }

  tableData() {
    this.productService.getProducts().subscribe((response: any) => {
      this.dataSource = new MatTableDataSource(response);
    }, (error: any) => {
      console.log(error)
      if(error.error?.message) {
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = GlobalConstants.genericError
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error)
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase()
  }

  handleAddAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Add'
    }
    dialogConfig.width = '850px'
    const dialogRef = this.dialog.open(ProductComponent, dialogConfig)
    this.router.events.subscribe(() => {
      dialogRef.close()
    })
    const sub = dialogRef.componentInstance.onAddProduct.subscribe((response) => {
      this.tableData()
    })
  }

  handleEditAction(values: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Edit',
      data: values
    }
    dialogConfig.width = '850px'
    const dialogRef = this.dialog.open(ProductComponent, dialogConfig)
    this.router.events.subscribe(() => {
      dialogRef.close()
    })
    const sub = dialogRef.componentInstance.onEditProduct.subscribe((response) => {
      this.tableData()
    })
  }

  handleDeleteAction(values: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message: 'delete ' + values.name + ' product'
    }
    const dialofRef = this.dialog.open(ConfirmationComponent, dialogConfig);
    const sub = dialofRef.componentInstance.onEmitStatusChange.subscribe((response) => {
      this.deleteProduct(values.id)
      dialofRef.close()
    })
  }

  deleteProduct(id: any) {
    this.productService.delete(id).subscribe((response:any) => {
      this.tableData();
      this.responseMessage = response?.message
      this.snackbarService.openSnackBar(this.responseMessage, 'success')
    }, (error: any) => {
      console.log(error)
      if(error.error?.message) {
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = GlobalConstants.genericError
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error)
    })
  }

  onChange(status: any, id: any) {
    var data = {
      status: status.toString(),
      id: id
    }
    this.productService.updateStatus(data).subscribe((response: any) => {
      this.responseMessage = response?.message;
      this.snackbarService.openSnackBar(this.responseMessage, "success")
    }, (error: any) => {
      if(error.error?.message) {
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = GlobalConstants.genericError
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error)
    })
  }
    


}
