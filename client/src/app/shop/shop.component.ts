import { Component, OnInit } from '@angular/core';
import { IBrand } from '../shared/models/brand';
import { IProduct } from '../shared/models/product';
import { IType } from '../shared/models/productType';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  products: IProduct[];
  brands: IBrand[];
  types: IType[];
  brandIdSelected = 0;
  typeIdSelected  = 0;

  //  Property for Sorting
  sortSelected = 'name';
  sortOptions = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price: Low to High', value: 'priceAsc'},
    {name: 'Price: High to Low', value: 'priceDesc'}
  ];

  constructor(private shopService: ShopService) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  // tslint:disable-next-line: typedef
  getProducts() {
    // tslint:disable-next-line: deprecation
    this.shopService.getProducts(this.brandIdSelected, this.typeIdSelected, this.sortSelected).subscribe(response => {
      this.products = response.data;
    }, error => {
      console.log(error);
    });

  }
  // tslint:disable-next-line: typedef
  getBrands() {
    // tslint:disable-next-line: deprecation
    this.shopService.getBrands().subscribe(response => {
      this.brands = [{id: 0, name: 'All'}, ...response];  // Add option to select all brands
    }, error => {
      console.log(error);
    } );
  }

  // tslint:disable-next-line: typedef
  getTypes() {
    // tslint:disable-next-line: deprecation
    this.shopService.getTypes().subscribe(response => {
      this.types = [{id: 0, name: 'All'}, ...response];  // option to select all types
    }, error => {
      console.log(error);
    } );
  }

  // tslint:disable-next-line: typedef
  onBrandSelected(brandId: number) {
    this.brandIdSelected = brandId;
    this.getProducts();
  }

  // tslint:disable-next-line: typedef
  onTypeSelected(typeId: number) {
    this.typeIdSelected = typeId;
    this.getProducts();
  }

  // for sorting
  // tslint:disable-next-line: typedef
  onSortSelected(sort: string) {
    this.sortSelected = sort;
    this.getProducts();
  }

}
