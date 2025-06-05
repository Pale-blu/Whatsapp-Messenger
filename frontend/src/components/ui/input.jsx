// ✅ CORRECT
export function Input({ value, onChange, placeholder }) {
  return (
    <input
      style={{
        padding: '8px',
        width: '100%',
        border: '1px solid #ccc',
        borderRadius: '4px',
        marginBottom: '10px',
      }}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}
