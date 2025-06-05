// ✅ CORRECT
export function Card({ children }) {
  return (
    <div style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '8px', background: '#f9f9f9' }}>
      {children}
    </div>
  );
}

export function CardContent({ children }) {
  return <div style={{ marginTop: '10px' }}>{children}</div>;
}
