// dynamic.tsx
import React from 'react';

interface DynamicProps {
  // Define your props here
  message: string;
}

const Dynamic: React.FunctionComponent<DynamicProps> = ({ message }) => {
  return (
    <div style={{ padding: '20px', border: '1px solid blue' }}>
      <h2>Lazy Loaded Component</h2>
      <p>{message}</p>
    </div>
  );
};

export default Dynamic; // Must be a default export