'use strict';

describe('Service: ticketService', function () {

  // load the service's module
  beforeEach(module('powerballTicketStatusApp'));

  // instantiate service
  var ticketService;
  beforeEach(inject(function (_ticketService_) {
    ticketService = _ticketService_;
  }));

  it('should do something', function () {
    expect(!!ticketService).toBe(true);
  });

});
