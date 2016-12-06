import {OnInit} from "@angular/core";
/**
 * Created by strukov on 3.12.16.
 */
export class ModalBehaviour implements OnInit{

  ngOnInit(): void {
    $('.modal').modal();
  }

  public openModal(modalName:JQuery):void{
    modalName.modal('open');
  }

  public closeModal(modalName:JQuery):void{
    modalName.modal('close');
  }
}
