import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'antd';

import { ticketsActions } from '../../../store/ticketsSlice';

import './TicketList.scss';
import Ticket from './Ticket/Ticket';

export default function TicketList() {
  const dispatch = useDispatch();
  const getMoreTicketsHandler = () => {
    dispatch(ticketsActions.getMoreTickets());
  };
  const selectorTickets = (state) => state.visualTickets;
  const tickets = useSelector(selectorTickets);
  return (
    <div className="list-container">
      <ul>
        {tickets.map((ticket) => (
          <Ticket
            price={ticket.price}
            carrier={ticket.carrier}
            key={ticket.price}
            segments={ticket.segments}
          />
        ))}
      </ul>
      <Button
        type="primary"
        style={{
          borderRadius: '5px',
          height: '50px',
          width: '100%',
          lineHeight: '20px',
          fontSize: '12px',
          fontFamily: 'open-sans',
          backgroundColor: '#2196F3',
        }}
        onClick={getMoreTicketsHandler}
      >
        ПОКАЗАТЬ ЕЩЁ 5 БИЛЕТОВ!
      </Button>
    </div>
  );
}
