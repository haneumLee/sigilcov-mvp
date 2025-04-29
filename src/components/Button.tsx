interface ButtonProps {
    text: string
    onClick: () => void
    style?: React.CSSProperties
  }
  
  function Button({ text, onClick, style }: ButtonProps) {
    return (
      <button
        style={{
          padding: "12px 24px",
          fontSize: "18px",
          backgroundColor: "#f0f0f0",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          width: "200px",
          ...style // 외부에서 전달한 스타일 병합
        }}
        onClick={onClick}
      >
        {text}
      </button>
    )
  }
  
export default Button
  