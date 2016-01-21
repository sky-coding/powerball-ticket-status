'use strict';

angular.module('powerballTicketStatusApp')
  .controller('MainCtrl', function ($scope, ticketService) {
    var _ = window._;
    var ctrl = this;

    ctrl.winnings = null;
    ctrl.jackpot = false;

    ctrl.winningTicket = ticketService.createBlankTicket();

    ctrl.myTickets = [
      ticketService.createBlankTicket(),
      ticketService.createBlankTicket(),
      ticketService.createBlankTicket()
    ];

    ctrl.addNewTicket = addNewTicket;
    ctrl.removeTicket = removeTicket;

    $scope.$watch('[ctrl.myTickets, ctrl.winningTicket]', function () {
      _.each(ctrl.myTickets, function (ticket) {
        ticketService.updateTicketStatus(ticket, ctrl.winningTicket);
      });

      ctrl.winnings = _.reduce(ctrl.myTickets, function (totalWinnings, ticket) {
        return _.isFinite(ticket.winnings) ? totalWinnings + ticket.winnings : totalWinnings;
      }, 0);

      ctrl.jackpot = _.any(ctrl.myTickets, {isJackpot: true});

    }, true);

    function addNewTicket() {
      ctrl.myTickets.push(ticketService.createBlankTicket());
    }

    function removeTicket(ticket) {
      ctrl.myTickets = _.without(ctrl.myTickets, ticket);
    }
  });
