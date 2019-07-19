// @flow
import React from 'react';
import moment from 'moment';
import styles from './Title.module.scss';

type Props = {
  title: string
};

const Title = ({ title }: Props) => (
  <div className={styles['title']}>
    <h1 className={styles['title__content']}>{title}</h1>
  </div>
);

export default Title;
