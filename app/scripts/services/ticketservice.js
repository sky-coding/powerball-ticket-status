'use strict';

angular.module('powerballTicketStatusApp')
  .factory('ticketService', function () {

    var _ = window._;

    return {
      createBlankTicket: createBlankTicket,
      doesNumberMatchTicket: doesNumberMatchTicket,
      updateTicketStatus: updateTicketStatus
    };

    function createBlankTicket() {
      return {
        winnings: null,
        isWinner: false,
        isJackpot: false,
        isInvalid: true,
        numbers: {
          1: null,
          2: null,
          3: null,
          4: null,
          5: null,
          powerball: null
        }
      };
    }

    function doesNumberMatchTicket(number, isPowerballNumber, ticketToMatch) {
      if (!number) {
        return false;
      }

      if (isPowerballNumber) {
        return number == ticketToMatch.numbers['powerball'];
      }

      var isNumberMatch = _.any([
        ticketToMatch.numbers[1],
        ticketToMatch.numbers[2],
        ticketToMatch.numbers[3],
        ticketToMatch.numbers[4],
        ticketToMatch.numbers[5]
      ], function (numberToMatch) {
        return numberToMatch && number == numberToMatch;
      });

      return isNumberMatch;
    }

    function isTicketValid(ticket) {
      // TODO: check valid number range

      // duplicate check
      var numbers = _.compact([ticket.numbers[1], ticket.numbers[2], ticket.numbers[3], ticket.numbers[4], ticket.numbers[5]]);
      var numbersWithoutDuplicates = _.uniq(numbers);
      return _.isEqual(numbers, numbersWithoutDuplicates);
    }

    function updateTicketStatus(ticket, winningTicket) {

      if (!isTicketValid(ticket)) {
        ticket.isInvalid = true;
        ticket.isWinner = false;
        ticket.isJackpot = false;
        ticket.winnings = null;

        return;
      }

      var totalWinningNumbers = _.reduce([
        doesNumberMatchTicket(ticket.numbers[1], false, winningTicket),
        doesNumberMatchTicket(ticket.numbers[2], false, winningTicket),
        doesNumberMatchTicket(ticket.numbers[3], false, winningTicket),
        doesNumberMatchTicket(ticket.numbers[4], false, winningTicket),
        doesNumberMatchTicket(ticket.numbers[5], false, winningTicket)
      ], function (total, isWinningNumber) {
        return isWinningNumber ? total + isWinningNumber : total;
      }, 0);

      var hasWinningPowerball = doesNumberMatchTicket(ticket.numbers['powerball'], true, winningTicket);


      // Winning Logic
      // TODO: reduce ticket status duplication:

      if (totalWinningNumbers == 5 && hasWinningPowerball) {

        ticket.isInvalid = false;
        ticket.isWinner = true;
        ticket.isJackpot = true;
        ticket.winnings = null;

        return; // JACKPOT!
      }

      if (totalWinningNumbers == 5) {

        ticket.isInvalid = false;
        ticket.isWinner = true;
        ticket.isJackpot = false;
        ticket.winnings = 1000000;

        return; // $1,000,000!
      }

      if (totalWinningNumbers == 4 && hasWinningPowerball) {

        ticket.isInvalid = false;
        ticket.isWinner = true;
        ticket.isJackpot = false;
        ticket.winnings = 50000;

        return; // $50,000!
      }

      if (totalWinningNumbers == 4) {

        ticket.isInvalid = false;
        ticket.isWinner = true;
        ticket.isJackpot = false;
        ticket.winnings = 100;

        return; // $100
      }

      if (totalWinningNumbers == 3 && hasWinningPowerball) {

        ticket.isInvalid = false;
        ticket.isWinner = true;
        ticket.isJackpot = false;
        ticket.winnings = 100;

        return; // $100
      }

      if (totalWinningNumbers == 3) {

        ticket.isInvalid = false;
        ticket.isWinner = true;
        ticket.isJackpot = false;
        ticket.winnings = 7;

        return; // $7
      }

      if (totalWinningNumbers == 2 && hasWinningPowerball) {

        ticket.isInvalid = false;
        ticket.isWinner = true;
        ticket.isJackpot = false;
        ticket.winnings = 7;

        return; // $7
      }

      if (totalWinningNumbers == 1 && hasWinningPowerball) {

        ticket.isInvalid = false;
        ticket.isWinner = true;
        ticket.isJackpot = false;
        ticket.winnings = 4;

        return; // $4
      }

      if (totalWinningNumbers == 1 && hasWinningPowerball) {

        ticket.isInvalid = false;
        ticket.isWinner = true;
        ticket.isJackpot = false;
        ticket.winnings = 4;

        return; // $4
      }

      ticket.isInvalid = false;
      ticket.isWinner = false;
      ticket.isJackpot = false;
      ticket.winnings = null;
    }

  });
