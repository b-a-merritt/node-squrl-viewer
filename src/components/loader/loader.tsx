import React from 'react';
import styles from './loader.module.css';

interface LoaderProps {
  size?: number;
  style?: React.CSSProperties;
}

export const Loader = ({
  size = 16,
  style = {},
}: LoaderProps) => {
  let borderWidth = 3;

  if (size > 96) borderWidth = 10;
  else if (size > 47) borderWidth = 5;
  else if (size > 23) borderWidth = 4;

  return (
    <div
      className={styles.loader}
      style={{
        borderWidth,
        borderColor: 'var(--color-grey-5)',
        borderTopColor: 'transparent',
        height: size,
        width: size,
        ...style
      }}
    />
  )
}