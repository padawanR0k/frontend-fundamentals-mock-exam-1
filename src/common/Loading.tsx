import { useEffect, useState } from 'react';
import { Spacing } from 'tosslib';

const LOADING_DELAY_MS = 300;

export function Loading() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, LOADING_DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  if (!show) {
    return null;
  }

  return (
    <>
      <Spacing size={16} />
      <div style={{ textAlign: 'center', color: '#666' }}>로딩 중...</div>
      <Spacing size={16} />
    </>
  );
}

