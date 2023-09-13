import React from 'react';

import './TicketList.scss';
import Ticket from './Ticket/Ticket';

export default function TicketList() {
  return (
    <ul>
      <Ticket />
      <Ticket />
      <Ticket />
      <Ticket />
      <Ticket />
    </ul>
  );
}
