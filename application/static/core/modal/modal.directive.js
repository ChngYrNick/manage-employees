'use strict';

angular.module('core.modal').directive('modal', [
  'modalService',
  (modalService) => ({
    link(scope, element, attrs) {
      function open() {
        element.show();
        $('body').addClass('modal-open');
      }

      function close() {
        element.hide();
        $('body').removeClass('modal-open');
      }

      if (!attrs.id) {
        console.error('modal must have an id');
        return;
      }

      element.appendTo('body');

      element.on('click', (e) => {
        const target = $(e.target);
        if (!target.closest('.modal-body').length) {
          scope.$evalAsync(close);
        }
      });

      scope.$on('$destroy', () => {
        modalService.remove(attrs.id);
        element.remove();
      });

      const modal = {
        id: attrs.id,
        open,
        close,
      };

      modalService.add(modal);
    },
  }),
]);
