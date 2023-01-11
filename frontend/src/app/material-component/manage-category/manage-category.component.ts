import { CategoryComponent } from './../dialog/category/category.component';
import { filter } from 'rxjs/operators';
import { GlobalConstants } from './../../shared/global-constants';
import { Router } from '@angular/router';
import { SnackbarService } from './../../services/snackbar.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CategoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.scss']
})
export class ManageCategoryComponent implements OnInit {
  displayedColumns:string[] = ['name', 'edit']
  dataSource: any;
  responseMessage: any;

  constructor(
    private categoryService: CategoryService,
    private dialog: MatDialog,
    private snackbarService: SnackbarService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.tableData()

  }

  tableData() {
    this.categoryService.getCategories().subscribe((response: any) => {
      this.dataSource = new MatTableDataSource(response)
    }, (error: any) => {
      if(error.error?.message) {
        this.responseMessage = error.error?.message
      } else {
        this.responseMessage = GlobalConstants.genericError;
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
    dialogConfig.width = "850px"
    const dialogRef = this.dialog.open(CategoryComponent, dialogConfig)
    this.router.events.subscribe(() => {
      dialogRef.close();
    })
    const sub = dialogRef.componentInstance.onAddCategory.subscribe(
      (response) => {
        this.tableData()
      }
    )
  }

  handleEditAction(value: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Edit',
      data: value
    }
    dialogConfig.width = "850px"
    const dialogRef = this.dialog.open(CategoryComponent, dialogConfig)
    this.router.events.subscribe(() => {
      dialogRef.close();
    })
    const sub = dialogRef.componentInstance.onEditCategory.subscribe(
      (response) => {
        this.tableData()
      }
    )
  }

}
