// @flow
import React from 'react';
import moment from 'moment';
import styles from './Meta.module.scss';

type Props = {
  created: string,
  updated: string
};

const Meta = ({ created, updated }: Props) => {
  const date = updated === undefined ? created : updated;

  if (date !== undefined) {
    return (
      <div className={styles['meta']}>
        <p className={styles['meta__date']}>
          <b>{moment(date).format('D MMM YYYY')}</b>
        </p>
      </div>
    );
  }
  else {
    return (
      <div></div>
    )
  }
};

export default Meta;
