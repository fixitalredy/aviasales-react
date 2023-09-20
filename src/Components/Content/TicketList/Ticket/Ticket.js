import React from 'react';
import { Card, Row, Col } from 'antd';
import add from 'date-fns/add';
// import { useSelector } from 'react-redux';

import styles from './Ticket.module.scss';

export default function Ticket({ price, carrier, segments }) {
  const firstSegment = segments[0];
  const secondSegment = segments[1];

  // const sortingSelector = (state) => ({
  //   filters: state.fiters,
  //   sort: state.sort,
  // });
  // const sortingStates = useSelector(sortingSelector);

  const ticketMake = (segment, type) => {
    if (type === 'time') {
      const dateOrigin = new Date(segment.date);
      const hoursOrigin = dateOrigin.getHours().toString().padStart(2, '00');
      const minutesOrigin = dateOrigin
        .getMinutes()
        .toString()
        .padStart(2, '00');
      const dateDestination = add(new Date(segment.date), {
        minutes: segment.duration,
      });
      const hoursDestination = dateDestination
        .getHours()
        .toString()
        .padStart(2, '00');
      const minutesDestination = dateDestination
        .getMinutes()
        .toString()
        .padStart(2, '00');
      return `${hoursOrigin}:${minutesOrigin} - ${hoursDestination}:${minutesDestination}`;
    }
    if (type === 'way') {
      return `${segment.origin} - ${segment.destination}`;
    }
    if (type === 'duration') {
      const durationHours = Math.floor(segment.duration / 60)
        .toString()
        .padStart(2, '00');
      const durationMinutes = Math.round(
        ((segment.duration / 60) % 1).toFixed(2) * 60
      )
        .toString()
        .padStart(2, '00');

      return `${durationHours}:${durationMinutes}`;
    }
    if (type === 'stops') {
      return segment.stops.join(' ');
    }
    if (type === 'stopscount') {
      return segment.stops.length !== 0 && segment.stops.length !== 1
        ? `${segment.stops.length} ПЕРЕСАДКИ`
        : segment.stops.length === 1
        ? '1 ПЕРЕСАДКА'
        : 'БЕЗ ПЕРЕСАДОК';
    }
    return null;
  };

  return (
    <li className={styles.container}>
      <Card
        className={styles.content}
        bodyStyle={{ padding: '22px', fontFamily: 'open-sans' }}
      >
        <Row className={styles.row}>
          <Col className={styles.col} lg={18} md={18} sm={18} xs={14}>
            {`${price} ₽`}
          </Col>
          <Col className={styles.col} lg={6} md={6} sm={6} xs={10}>
            <img
              src={`//pics.avs.io/99/36/${carrier}.png`}
              alt="carrier logo"
              height={40}
            />
          </Col>
        </Row>
        <Row className={styles.row}>
          <Col className={styles.col} lg={8} md={8} sm={8} xs={10}>
            <Row className={styles.subrow}>
              {ticketMake(firstSegment, 'way')}
            </Row>
            <Row className={styles.subrow}>
              {ticketMake(firstSegment, 'time')}
            </Row>
          </Col>
          <Col className={styles.col} lg={8} md={8} sm={8} xs={6}>
            <Row className={styles.subrow}>В ПУТИ</Row>
            <Row className={styles.subrow}>
              {ticketMake(firstSegment, 'duration')}
            </Row>
          </Col>
          <Col className={styles.col} lg={8} md={8} sm={8} xs={8}>
            <Row className={styles.subrow}>
              {ticketMake(firstSegment, 'stopscount')}
            </Row>
            <Row className={styles.subrow}>
              {ticketMake(firstSegment, 'stops')}
            </Row>
          </Col>
        </Row>
        <Row className={styles.row}>
          <Col className={styles.col} lg={8} md={8} sm={8} xs={10}>
            <Row className={styles.subrow}>
              {ticketMake(secondSegment, 'way')}
            </Row>
            <Row className={styles.subrow}>
              {ticketMake(secondSegment, 'time')}
            </Row>
          </Col>
          <Col className={styles.col} lg={8} md={8} sm={8} xs={6}>
            <Row className={styles.subrow}>В ПУТИ</Row>
            <Row className={styles.subrow}>
              {ticketMake(secondSegment, 'duration')}
            </Row>
          </Col>
          <Col className={styles.col} lg={8} md={8} sm={8} xs={8}>
            <Row className={styles.subrow}>
              {ticketMake(secondSegment, 'stopscount')}
            </Row>
            <Row className={styles.subrow}>
              {ticketMake(secondSegment, 'stops')}
            </Row>
          </Col>
        </Row>
      </Card>
    </li>
  );
}
