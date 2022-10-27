import { Component, OnInit } from '@angular/core';
import { Invoice } from '../../../shared/models/invoice';
import { InvoiceService } from 'src/app/services/invoice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styles: [`
    .dark-modal .modal-content {
      background-color: #292b2c;
      color: white;
    }
    .dark-modal .close {
      color: white;
    }
    .light-blue-backdrop {
      background-color: #5cb3fd;
    }
  `]
})

export class PdfComponent implements OnInit {

  private role: any;
  showAdmin = false;
  showManager = false;
  showFinancialController = false;
  showFinancialClerk = false;
  financialControllerAcceptance = false;

  currentUser: any;
  click!: string;
  id!: number;
  invoice!: Invoice;
  finalStatus = false;
  correction = false;

  constructor(private invoiceService: InvoiceService, private storageService: StorageService, private route: ActivatedRoute, private router: Router, private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
    if (this.currentUser != null) {
      this.role = this.currentUser.role;

      this.showAdmin = this.role.includes('ROLE_ADMIN');
      this.showManager = this.role.includes('ROLE_MANAGER');
      this.showFinancialController = this.role.includes('ROLE_FINANCIAL_CONTROLLER');
      this.showFinancialClerk = this.role.includes('ROLE_FINANCIAL_CLERK');
      this.initPdf();
    } else {
      this.storageService.login();
    }

  }

  initPdf() {
    this.id = this.route.snapshot.params['id'];

    this.invoice = new Invoice();
    this.invoiceService.getInvoiceById(this.id).subscribe( data => {
      this.invoice = data;
      if (this.invoice.status == "Rejected by financial controller" || this.invoice.status == "Rejected by manager" || this.invoice.status == "Rejected by administrator") {
        this.finalStatus = true;
        this.correction = false;
      } else if (this.invoice.status == "Accepted by manager" || this.invoice.status == "Accepted by administrator on the second level") {
        this.finalStatus = true;
        this.correction = false;
      } else if(this.invoice.status == "Accepted by financial controller" || this.invoice.status == "Accepted by administrator on the first level") {
        this.financialControllerAcceptance = true;
        this.finalStatus = false;
        this.correction = false;
      } else if (this.invoice.status == "Returned by financial controller" || this.invoice.status == "Returned by manager" || this.invoice.status == "Returned by administrator") {
        this.financialControllerAcceptance = false;
        this.finalStatus = false;
        this.correction = true;
      }
    });
  }
  
  getInvoices(){
    this.router.navigate(['list_invoice']);
  }

  downloadPdf(id: number) {
    const linkSource = 'data:application/pdf;base64,' + this.invoice.pdfBlob;
    const downloadLink = document.createElement("a");
    const fileName = "invoice.pdf";
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  updateInvoice(id: number) {
    this.router.navigate(['update-invoice', id]);
  }

  updateAcceptance(content: any, id: number) {
    this.currentUser = this.storageService.getUser();
    this.modalService.open(content, {}).result.then((result) => {
      if(result == "Acceptance click" && (this.currentUser.role == "ROLE_FINANCIAL_CONTROLLER" || this.currentUser.role == "ROLE_ADMIN") && this.financialControllerAcceptance == false) {
        this.financialControllerAcceptance = true;
        this.finalStatus = false;
        this.correction = false;
        this.click = "acceptance";
        this.invoiceService.updateStatus(id, this.click, this.currentUser).subscribe( data => {
          this.router.navigate(['list_invoice']);
        });
      } else if(result == "Acceptance click" && (this.currentUser.role == "ROLE_MANAGER" || this.currentUser.role == "ROLE_ADMIN") && this.financialControllerAcceptance == true) {
        this.finalStatus = true;
        this.correction = false;
        this.click = "acceptance";
        this.invoiceService.updateStatus(id, this.click, this.currentUser).subscribe( data => {
          this.router.navigate(['list_invoice']);
        });
      }
    });
  }

  updateRejection(content: any, id: number) {
    this.modalService.open(content, {}).result.then((result) => {
      if(result == "Rejection click") {
        this.finalStatus = true;
        this.correction = false;
        this.click = "rejection";
        this.invoiceService.updateStatus(id, this.click, this.currentUser).subscribe( data => {
          this.router.navigate(['list_invoice']);
        });
      }
    });

  }

  updateCorrection(content: any, id: number) {
    this.modalService.open(content, {}).result.then((result) => {
      if(result == "Return click") {
        this.financialControllerAcceptance = false;
        this.finalStatus = false;
        this.correction = true;
        this.click = "return";
        this.invoiceService.updateStatus(id, this.click, this.currentUser).subscribe( data => {
          this.router.navigate(['list_invoice']);
        });    
      }
    });
  }

  invoiceUpdate(id: number) {
    this.financialControllerAcceptance = false;
    this.finalStatus = false;
    this.correction = false;
    this.click = "updated";

    this.invoiceService.updateStatus(id, this.click, this.currentUser).subscribe( data => {
      this.router.navigate(['list_invoice']);
    });
  }

  deleteInvoice(content: any, id: number) {
    this.modalService.open(content, {}).result.then((result) => {
      if(result == "Delete click") {
        this.invoiceService.deleteInvoice(id).subscribe( data => {
          this.getInvoices();
        })
      }
    });
  }

}
