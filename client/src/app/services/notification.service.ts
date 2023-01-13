import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  options = {
    closeButton: true,
    positionClass: 'toast-bottom-right'
  }

  constructor(private toastr: ToastrService) { }

  showSuccess(message: string, title: string){
    this.toastr.success(message, title, this.options)
}
 
  showError(message: string, title: string){
    this.toastr.error(message, title, this.options)
  }
 
  showInfo(message: string, title: string){
    this.toastr.info(message, title, this.options)
  }
 
  showWarning(message: string, title: string){
    this.toastr.warning(message, title, this.options)
  }
}
