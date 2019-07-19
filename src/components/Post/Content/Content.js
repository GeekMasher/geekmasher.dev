// @flow
import React from 'react';
import styles from './Content.module.scss';

type Props = {
  body: string
};

const Content = ({ body }: Props) => (
  <div className={styles['content']}>
    <div className={styles['content__body']} dangerouslySetInnerHTML={{ __html: body }} />
  </div>
);

export default Content;
