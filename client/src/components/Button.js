const Button = ({type, onClick, children}) => {
  return (
    <div className="form-group pb-2">
      <button className={type} onClick={onClick}>{children}</button>
    </div>
  )
}

export  default Button;