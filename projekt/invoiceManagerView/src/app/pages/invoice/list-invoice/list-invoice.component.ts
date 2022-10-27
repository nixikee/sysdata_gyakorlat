import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/user';
import { InvoiceService } from './../../../services/invoice.service';
import { Invoice } from '../../../shared/models/invoice';
import { sortBy } from 'sort-by-typescript';
import { StorageService } from 'src/app/services/storage.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-list-invoice',
  templateUrl: './list-invoice.component.html',
  styleUrls: ['./list-invoice.component.css']
})
export class ListInvoiceComponent implements OnInit {

  currentUser: any;
  public invoices!: Invoice[];
  public searchedInvoices: Invoice[] = [];
  public conditions: Array<number | string | Date> = [];
  public conditionsString: Array<string> = [];
  public stringAssistant!: string;
  public users?: User[];
  public invoice!: Invoice;
  public searchText: any;
  index!: number;
  index2!: number;

  internalInvoiceId = "";
  minUploadDate = "";
  maxUploadDate = "";
  costCenter = "";
  businessPartner = "";
  contractor = "";
  currency = "";
  minAmount = "";
  maxAmount = "";
  orderNumber = "";
  supplierInvoiceId = "";
  status = "";

  searchTrue = false;
  internalInvoiceIdSearch = false;
  minUploadDateSearch = false;
  maxUploadDateSearch = false;
  costCenterSearch = false;
  businessPartnerSearch = false;
  contractorSearch = false;
  currencySearch = false;
  minAmountSearch = false;
  maxAmountSearch = false;
  orderNumberSearch = false;
  supplierInvoiceIdSearch = false;
  statusSearch = false;

  orderInternalInvoiceId = "not order";
  orderUploadDate = "not order";
  orderCostCenter = "not order";
  orderBusinessPartner = "not order";
  orderContractor = "not order";
  orderCurrency = "not order";
  orderAmount = "not order";
  orderOrderNumber = "not order";
  orderSupplierInvoiceId = "not order";
  orderStatus = "not order";

  constructor(private storageService: StorageService, private invoiceService: InvoiceService, private userService: UserService,
    private router: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
    if (this.currentUser.role != null) {
      this.getInvoice();
    } else {
      this.storageService.login();
    }
  }

  private getInvoice(){
    this.invoiceService.getInvoices().subscribe(data => {
      this.invoices = data;
    });
  }

  invoicePdf(id: number): void {
    this.router.navigate(['pdf_invoice', id]);
  }

  searchInvoice(content: any) {
    this.modalService.open(content, {}).result.then((result) => {
      if(result == "Search click") {
        this.searchView();
      } else {
      }
    });
  }

  searchView() {
    if (this.internalInvoiceId != "" || this.minUploadDate != "" || this.maxUploadDate != "" || this.costCenter.length != 0 || this.businessPartner.length != 0 || this.contractor.length != 0
      || this.currency.length != 0 || this.minAmount != "" || this.maxAmount != "" || this.orderNumber.length != 0 || this.supplierInvoiceId.length != 0 
      || this.status.length != 0) {
        this.searchTrue = true;
    } else {
        this.searchTrue = false;
    }

    if (this.internalInvoiceId != "") {
      if (!this.conditions.includes("internalInvoiceId")) {
        this.internalInvoiceIdSearch = true;
        this.conditions.push("internalInvoiceId", this.internalInvoiceId);
      } else {
        this.index = this.conditions.indexOf("internalInvoiceId");
        this.conditions.splice(this.index + 1, 1, this.internalInvoiceId);
      }
    }
    if (this.minUploadDate != "") {
      if (!this.conditions.includes("minUploadDate")) {
        this.minUploadDateSearch = true;
        this.conditions.push("minUploadDate", this.minUploadDate);
      } else {
        this.index = this.conditions.indexOf("minUploadDate");
        this.conditions.splice(this.index + 1, 1, this.minUploadDate);
      }
    }
    if (this.maxUploadDate != "") {
      if (!this.conditions.includes("maxUploadDate")) {
        this.maxUploadDateSearch = true;
        this.conditions.push("maxUploadDate", this.maxUploadDate);
      } else {
        this.index = this.conditions.indexOf("maxUploadDate");
        this.conditions.splice(this.index + 1, 1, this.maxUploadDate);
      }
    }
    if (this.costCenter.length != 0) {
      if (!this.conditions.includes("costCenter")) {
        this.costCenterSearch = true;
        this.conditions.push("costCenter", this.costCenter);
        this.conditionsString.push("costCenter", this.costCenter);
      } else {
        this.index = this.conditions.indexOf("costCenter");
        this.index2 = this.conditionsString.indexOf("costCenter");
        this.conditions.splice(this.index + 1, 1, this.costCenter);
        this.conditionsString.splice(this.index2 + 1, 1, this.costCenter);
      }
    }
    if (this.businessPartner.length != 0) {
      if (!this.conditions.includes("businessPartner")) {
        this.businessPartnerSearch = true;
        this.conditions.push("businessPartner", this.businessPartner);
        this.conditionsString.push("businessPartner", this.businessPartner);
      } else {
        this.index = this.conditions.indexOf("businessPartner");
        this.index2 = this.conditionsString.indexOf("businessPartner");
        this.conditions.splice(this.index + 1, 1, this.businessPartner);
        this.conditionsString.splice(this.index2 + 1, 1, this.businessPartner);
      }
    }
    if (this.contractor.length != 0) {
      if (!this.conditions.includes("contractor")) {
        this.contractorSearch = true;
        this.conditions.push("contractor", this.contractor);
        this.conditionsString.push("contractor", this.contractor);
      } else {
        this.index = this.conditions.indexOf("contractor");
        this.index2 = this.conditionsString.indexOf("contractor");
        this.conditions.splice(this.index + 1, 1, this.contractor);
        this.conditionsString.splice(this.index2 + 1, 1, this.contractor);
      }
    } 
    if (this.currency.length != 0) {
      if (!this.conditions.includes("currency")) {
        this.currencySearch = true;
        this.conditions.push("currency", this.currency);
        this.conditionsString.push("currency", this.currency);
      } else {
        this.index = this.conditions.indexOf("currency");
        this.index2 = this.conditionsString.indexOf("currency");
        this.conditions.splice(this.index + 1, 1, this.currency);
        this.conditionsString.splice(this.index2 + 1, 1, this.currency);
      }
    }
    if (this.minAmount != "") {
      if (!this.conditions.includes("minAmount")) {
        this.minAmountSearch = true;
        this.conditions.push("minAmount", this.minAmount);
      } else {
        this.index = this.conditions.indexOf("minAmount");
        this.conditions.splice(this.index + 1, 1, this.minAmount);
      }
    }
    if (this.maxAmount != "") {
      if (!this.conditions.includes("maxAmount")) {
        this.maxAmountSearch = true;
        this.conditions.push("maxAmount", this.maxAmount);
      } else {
        this.index = this.conditions.indexOf("maxAmount");
        this.conditions.splice(this.index + 1, 1, this.maxAmount);
      }
    }
    if (this.orderNumber.length != 0) {
      if (!this.conditions.includes("orderNumber")) {
        this.orderNumberSearch = true;
        this.conditions.push("orderNumber", this.orderNumber);
        this.conditionsString.push("orderNumber", this.orderNumber);
      } else {
        this.index = this.conditions.indexOf("orderNumber");
        this.index2 = this.conditionsString.indexOf("orderNumber");
        this.conditions.splice(this.index + 1, 1, this.orderNumber);
        this.conditionsString.splice(this.index2 + 1, 1, this.orderNumber);
      }
    }
    if (this.supplierInvoiceId.length != 0) {
      if (!this.conditions.includes("supplierInvoiceId")) {
        this.supplierInvoiceIdSearch = true;
        this.conditions.push("supplierInvoiceId", this.supplierInvoiceId);
        this.conditionsString.push("supplierInvoiceId", this.supplierInvoiceId);
      } else {
        this.index = this.conditions.indexOf("supplierInvoiceId");
        this.index2 = this.conditionsString.indexOf("supplierInvoiceId");
        this.conditions.splice(this.index + 1, 1, this.supplierInvoiceId);
        this.conditionsString.splice(this.index2 + 1, 1, this.supplierInvoiceId);
      }
    }
    if (this.status.length != 0) {
      if (!this.conditions.includes("status")) {
        this.statusSearch = true;
        this.conditions.push("status", this.status);
        this.conditionsString.push("status", this.status);
      } else {
        this.index = this.conditions.indexOf("status");
        this.index2 = this.conditionsString.indexOf("status");
        this.conditions.splice(this.index + 1, 1, this.status);
        this.conditionsString.splice(this.index2 + 1, 1, this.status);
      }
    }

    this.search(this.conditions, this.conditionsString);
  }

  search(conditionsArray = new Array<number | string | Date>, conditionsStringArray = new Array<string>) {

    this.searchedInvoices = this.invoices;

    for (let i = 0; i < this.searchedInvoices.length; i++) {

      if (conditionsArray.includes("internalInvoiceId")) {
        this.index = conditionsArray.indexOf("internalInvoiceId");
        if (this.searchedInvoices[i].internalInvoiceId != conditionsArray[this.index + 1]) {
          this.searchedInvoices.splice(i, 1);
          i--;
        }
      }

      if (conditionsArray.includes("minUploadDate") && conditionsArray.includes("maxUploadDate")) {
        this.index = conditionsArray.indexOf("minUploadDate");
        this.index2 = conditionsArray.indexOf("maxUploadDate");
        if (this.searchedInvoices[i].uploadDate < conditionsArray[this.index + 1] || this.invoices[i].uploadDate > conditionsArray[this.index2 + 1] ) {
          this.searchedInvoices.splice(i, 1);
          i--;
        }
      } else if (conditionsArray.includes("minUploadDate")) {
        this.index = conditionsArray.indexOf("minUploadDate");
        if (this.searchedInvoices[i].uploadDate < conditionsArray[this.index + 1]) {
          this.searchedInvoices.splice(i, 1);
          i--;
        }
      } else if (conditionsArray.includes("maxUploadDate")) {
        this.index = conditionsArray.indexOf("maxUploadDate");
        if (this.searchedInvoices[i].uploadDate > conditionsArray[this.index + 1]) {
          this.searchedInvoices.splice(i, 1);
          i--;
        }
      }

      if (conditionsStringArray.includes("costCenter")) {
        this.index = conditionsStringArray.indexOf("costCenter");
        if (!this.searchedInvoices[i].costCenter.toUpperCase().startsWith(conditionsStringArray[this.index + 1].toUpperCase())) {
          this.searchedInvoices.splice(i, 1);
          i--;
        }
      }

      if (conditionsStringArray.includes("businessPartner")) {
        this.index = conditionsStringArray.indexOf("businessPartner");
        if (!this.searchedInvoices[i].businessPartner.toUpperCase().startsWith(conditionsStringArray[this.index + 1].toUpperCase())) {
          this.searchedInvoices.splice(i, 1);
          i--;
        }
      }

      if (conditionsStringArray.includes("contractor")) {
        this.index = conditionsStringArray.indexOf("contractor");
        if (!this.searchedInvoices[i].contractor.toUpperCase().startsWith(conditionsStringArray[this.index + 1].toUpperCase())) {
          this.searchedInvoices.splice(i, 1);
          i--;
        }
      }

      if (conditionsStringArray.includes("currency")) {
        this.index = conditionsStringArray.indexOf("currency");
        if (!this.searchedInvoices[i].currency.toUpperCase().startsWith(conditionsStringArray[this.index + 1].toUpperCase())) {
          this.searchedInvoices.splice(i, 1);
          i--;
        }
      }

      if (conditionsArray.includes("minAmount") && conditionsArray.includes("maxAmount")) {
        this.index = conditionsArray.indexOf("minAmount");
        this.index2 = conditionsArray.indexOf("maxAmount");
        if (this.searchedInvoices[i].amount < conditionsArray[this.index + 1] || this.invoices[i].amount > conditionsArray[this.index2 + 1]) {
          this.searchedInvoices.splice(i, 1);
          i--;
        }
      } else if (conditionsArray.includes("minAmount")) {
        this.index = conditionsArray.indexOf("minAmount");
        if (this.searchedInvoices[i].amount < conditionsArray[this.index + 1]) {
          this.searchedInvoices.splice(i, 1);
          i--;
        }
      } else if (conditionsArray.includes("maxAmount")) {
        this.index = conditionsArray.indexOf("maxAmount");
        if (this.searchedInvoices[i].amount > conditionsArray[this.index + 1]) {
          this.searchedInvoices.splice(i, 1);
          i--;
        }
      }

      if (conditionsStringArray.includes("orderNumber")) {
        this.index = conditionsStringArray.indexOf("orderNumber");
        if (!this.searchedInvoices[i].orderNumber.toUpperCase().startsWith(conditionsStringArray[this.index + 1].toUpperCase())) {
          this.searchedInvoices.splice(i, 1);
          i--;
        }
      }

      if (conditionsStringArray.includes("supplierInvoiceId")) {
        this.index = conditionsStringArray.indexOf("supplierInvoiceId");
        if (!this.searchedInvoices[i].supplierInvoiceId.toUpperCase().startsWith(conditionsStringArray[this.index + 1].toUpperCase())) {
          this.searchedInvoices.splice(i, 1);
          i--;
        }
      }

      if (conditionsStringArray.includes("status")) {
        this.index = conditionsStringArray.indexOf("status");
        if (!this.searchedInvoices[i].status.toUpperCase().startsWith(conditionsStringArray[this.index + 1].toUpperCase())) {
          this.searchedInvoices.splice(i, 1);
          i--;
        }
      }
    }
  }

  searchItemDelete(itemName: string) {
    this.index = this.conditions.indexOf(itemName);
    this.index2 = this.conditionsString.indexOf(itemName);
    this.conditions.splice(this.index, 2);
    this.conditionsString.splice(this.index, 2);
    this.searchedInvoices = [];
    this.search(this.conditions);
    if (itemName == "internalInvoiceId") {
      this.internalInvoiceIdSearch = false;
      this.internalInvoiceId = "";
    } else if (itemName == "minUploadDate") {
      this.minUploadDateSearch = false;
      this.minUploadDate = "";
    } else if (itemName == "maxUploadDate") {
      this.maxUploadDateSearch = false;
      this.maxUploadDate = "";
    } else if (itemName == "costCenter") {
      this.costCenterSearch = false;
      this.costCenter = "";
    } else if (itemName == "businessPartner") {
      this.businessPartnerSearch = false;
      this.businessPartner = "";
    } else if (itemName == "contractor") {
      this.contractorSearch = false;
      this.contractor = "";
    } else if (itemName == "currency") {
      this.currencySearch = false;
      this.currency = "";
    } else if (itemName == "minAmount") {
      this.minAmountSearch = false;
      this.minAmount = "";
    } else if (itemName == "maxAmount") {
      this.maxAmountSearch = false;
      this.maxAmount = "";
    } else if (itemName == "orderNumber") {
      this.orderNumberSearch = false;
      this.orderNumber = "";
    } else if (itemName == "supplierInvoiceId") {
      this.supplierInvoiceIdSearch = false;
      this.supplierInvoiceId = "";
    } else if (itemName == "status") {
      this.statusSearch = false;
      this.status = "";
    }

    if (this.conditions.length == 0) {
      this.searchTrue = false;
      this.getInvoice();
    }
  }

  searchDelete() {
    this.searchTrue = false;
    this.conditions.splice(0, this.conditions.length);
    this.conditionsString.splice(0, this.conditionsString.length);
    this.searchedInvoices.splice(0, this.searchedInvoices.length);
    this.internalInvoiceIdSearch = false;
    this.minUploadDateSearch = false;
    this.maxUploadDateSearch = false;
    this.costCenterSearch = false;
    this.businessPartnerSearch = false;
    this.contractorSearch = false;
    this.currencySearch = false;
    this.minAmountSearch = false;
    this.maxAmountSearch = false;
    this.orderNumberSearch = false;
    this.supplierInvoiceIdSearch = false;
    this.statusSearch = false;

    this.internalInvoiceId = "";
    this.minUploadDate = "";
    this.maxUploadDate = "";
    this.costCenter = "";
    this.businessPartner = "";
    this.contractor = "";
    this.currency = "";
    this.minAmount = "";
    this.maxAmount = "";
    this.orderNumber = "";
    this.supplierInvoiceId = "";
    this.status = "";

    this.getInvoice();
  }

  orderByInternalInvoiceId() {
    this.notOrderByInternalInvoiceId();
    if (this.orderInternalInvoiceId == "not ordered" || this.orderInternalInvoiceId == "reverse") {
      this.orderInternalInvoiceId = "ordered";
      this.invoices.sort(sortBy('-internalInvoiceId'));
    } else {
      this.orderInternalInvoiceId = "reverse";
      this.invoices.sort(sortBy('internalInvoiceId'));
    }
  }

  orderByUploadDate() {
    this.notOrderByUploadDate();
    if (this.orderUploadDate == "not ordered" || this.orderUploadDate == "reverse") {
      this.orderUploadDate = "ordered";
      this.invoices.sort(sortBy('-uploadDate'));
    } else {
      this.orderUploadDate = "reverse";
      this.invoices.sort(sortBy('uploadDate'));
    }
  }

  orderByCostCenter() {
    this.notOrderByCostCenter();
    if (this.orderCostCenter == "not ordered" || this.orderCostCenter == "reverse") {
      this.orderCostCenter = "ordered";
      this.invoices.sort(sortBy('-costCenter'));
    } else {
      this.orderCostCenter = "reverse";
      this.invoices.sort(sortBy('costCenter'));
    }
  }

  orderByBusinessPartner() {
    this.notOrderByBusinessPartner();
    if (this.orderBusinessPartner == "not ordered" || this.orderBusinessPartner == "reverse") {
      this.orderBusinessPartner = "ordered";
      this.invoices.sort(sortBy('-businessPartner'));
    } else {
      this.orderBusinessPartner = "reverse";
      this.invoices.sort(sortBy('businessPartner'));
    }
  }

  orderByContractor() {
    this.notOrderByContractor();
    if (this.orderContractor == "not ordered" || this.orderContractor == "reverse") {
      this.orderContractor = "ordered";
      this.invoices.sort(sortBy('-contractor'));
    } else {
      this.orderContractor = "reverse";
      this.invoices.sort(sortBy('contractor'));
    }
  }

  orderByCurrency() {
    this.notOrderByCurrency();
    if (this.orderCurrency == "not ordered" || this.orderCurrency == "reverse") {
      this.orderCurrency = "ordered";
      this.invoices.sort(sortBy('-currency'));
    } else {
      this.orderCurrency = "reverse";
      this.invoices.sort(sortBy('currency'));
    }
  }

  orderByAmount() {
    this.notOrderByAmount();
    if (this.orderAmount == "not ordered" || this.orderAmount == "reverse") {
      this.orderAmount = "ordered";
      this.invoices.sort(sortBy('-amount'));
    } else {
      this.orderAmount = "reverse";
      this.invoices.sort(sortBy('amount'));
    }
  }

  orderByOrderNumber() {
    this.notOrderByOrderNumber();
    if (this.orderOrderNumber == "not ordered" || this.orderOrderNumber == "reverse") {
      this.orderOrderNumber = "ordered";
      this.invoices.sort(sortBy('-orderNumber'));
    } else {
      this.orderOrderNumber = "reverse";
      this.invoices.sort(sortBy('orderNumber'));
    }
  }

  orderBySupplierInvoiceId() {
    this.notOrderBySupplierInvoiceId();
    if (this.orderSupplierInvoiceId == "not ordered" || this.orderSupplierInvoiceId == "reverse") {
      this.orderSupplierInvoiceId = "ordered";
      this.invoices.sort(sortBy('-supplierInvoiceId'));
    } else {
      this.orderSupplierInvoiceId = "reverse";
      this.invoices.sort(sortBy('supplierInvoiceId'));
    }
  }

  orderByStatus() {
    this.notOrderByStatus();
    if (this.orderStatus == "not ordered" || this.orderStatus == "reverse") {
      this.orderStatus = "ordered";
      this.invoices.sort(sortBy('-status'));
    } else {
      this.orderStatus = "reverse";
      this.invoices.sort(sortBy('status'));
    }
  }

  notOrderByInternalInvoiceId() {
    this.orderUploadDate = "not order";
    this.orderCostCenter = "not order";
    this.orderBusinessPartner = "not order";
    this.orderContractor = "not order";
    this.orderCurrency = "not order";
    this.orderAmount = "not order";
    this.orderOrderNumber = "not order";
    this.orderSupplierInvoiceId = "not order";
    this.orderStatus = "not order";
  }

  notOrderByUploadDate() {
    this.orderInternalInvoiceId = "not order";
    this.orderCostCenter = "not order";
    this.orderBusinessPartner = "not order";
    this.orderContractor = "not order";
    this.orderCurrency = "not order";
    this.orderAmount = "not order";
    this.orderOrderNumber = "not order";
    this.orderSupplierInvoiceId = "not order";
    this.orderStatus = "not order";
  }

  notOrderByCostCenter() {
    this.orderInternalInvoiceId = "not order";
    this.orderUploadDate = "not order";
    this.orderBusinessPartner = "not order";
    this.orderContractor = "not order";
    this.orderCurrency = "not order";
    this.orderAmount = "not order";
    this.orderOrderNumber = "not order";
    this.orderSupplierInvoiceId = "not order";
    this.orderStatus = "not order";
  }

  notOrderByBusinessPartner() {
    this.orderInternalInvoiceId = "not order";
    this.orderUploadDate = "not order";
    this.orderCostCenter = "not order";
    this.orderContractor = "not order";
    this.orderCurrency = "not order";
    this.orderAmount = "not order";
    this.orderOrderNumber = "not order";
    this.orderSupplierInvoiceId = "not order";
    this.orderStatus = "not order";
  }

  notOrderByContractor() {
    this.orderInternalInvoiceId = "not order";
    this.orderUploadDate = "not order";
    this.orderCostCenter = "not order";
    this.orderBusinessPartner = "not order";
    this.orderCurrency = "not order";
    this.orderAmount = "not order";
    this.orderOrderNumber = "not order";
    this.orderSupplierInvoiceId = "not order";
    this.orderStatus = "not order";
  }

  notOrderByCurrency() {
    this.orderInternalInvoiceId = "not order";
    this.orderUploadDate = "not order";
    this.orderCostCenter = "not order";
    this.orderBusinessPartner = "not order";
    this.orderContractor = "not order";
    this.orderAmount = "not order";
    this.orderOrderNumber = "not order";
    this.orderSupplierInvoiceId = "not order";
    this.orderStatus = "not order";
  }

  notOrderByAmount() {
    this.orderInternalInvoiceId = "not order";
    this.orderUploadDate = "not order";
    this.orderCostCenter = "not order";
    this.orderBusinessPartner = "not order";
    this.orderContractor = "not order";
    this.orderCurrency = "not order";
    this.orderOrderNumber = "not order";
    this.orderSupplierInvoiceId = "not order";
    this.orderStatus = "not order";
  }

  notOrderByOrderNumber() {
    this.orderInternalInvoiceId = "not order";
    this.orderUploadDate = "not order";
    this.orderCostCenter = "not order";
    this.orderBusinessPartner = "not order";
    this.orderContractor = "not order";
    this.orderCurrency = "not order";
    this.orderAmount = "not order";
    this.orderSupplierInvoiceId = "not order";
    this.orderStatus = "not order";
  }

  notOrderBySupplierInvoiceId() {
    this.orderInternalInvoiceId = "not order";
    this.orderUploadDate = "not order";
    this.orderCostCenter = "not order";
    this.orderBusinessPartner = "not order";
    this.orderContractor = "not order";
    this.orderCurrency = "not order";
    this.orderAmount = "not order";
    this.orderOrderNumber = "not order";
    this.orderStatus = "not order";
  }

  notOrderByStatus() {
    this.orderInternalInvoiceId = "not order";
    this.orderUploadDate = "not order";
    this.orderCostCenter = "not order";
    this.orderBusinessPartner = "not order";
    this.orderContractor = "not order";
    this.orderCurrency = "not order";
    this.orderAmount = "not order";
    this.orderOrderNumber = "not order";
    this.orderSupplierInvoiceId = "not order";
  }

}
