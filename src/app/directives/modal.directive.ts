import {OnInit} from "@angular/core";
/**
 * Created by strukov on 3.12.16.
 */
export abstract class ModalBehaviour implements OnInit {

  private modalName: JQuery;

  constructor() {
  }

  ngOnInit(): void {
    $('.modal').modal({dismissible: false});
  }

  protected initModalName(modalName: JQuery) {
    this.modalName = modalName;
  }

  protected openModal(): void {
    this.modalName.modal('open');
  }

  protected closeModal(): void {
    this.modalName.modal('close');
  }
}
