// @flow
import React from 'react';
import moment from 'moment';
import styles from './Meta.module.scss';

type Props = {
  publishDate: string,
  lastUpdated: string
};

const Meta = ({ publishDate, lastUpdated }: Props) => {

  const date = lastUpdated == undefined ? publishDate : lastUpdated;

  return (
    <div className={styles['meta']}>
      <p className={styles['meta__date']}>
        <b>{moment(date).format('D MMM YYYY')}</b>
      </p>
    </div>
  );
};

export default Meta;
