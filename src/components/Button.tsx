interface ButtonProps {
    text: string
    onClick: () => void
  }
  
  function Button({ text, onClick }: ButtonProps) {
    return (
      <button
        style={{
          padding: "12px 24px",
          fontSize: "18px",
          backgroundColor: "#f0f0f0",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          width: "200px"
        }}
        onClick={onClick}
      >
        {text}
      </button>
    )
  }
  
export default Button
  