'use strict';

angular.module('core.modal').factory('modalService', () => {
  class ModalService {
    constructor() {
      this.modals = [];
    }

    findById(id) {
      return this.modals.findIndex((modal) => modal.id === id);
    }

    add(modal) {
      this.modals.push(modal);
    }

    remove(id) {
      this.modals.splice(this.findById(id), 1);
    }

    open(id) {
      this.modals[this.findById(id)].open();
    }

    close(id) {
      this.modals[this.findById(id)].close();
    }
  }

  return new ModalService();
});
