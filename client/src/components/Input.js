const Input = ({ id, type, title, value, onChange }) => {
  return (
    <div className="form-group pb-2 text-lg-start">
      <label htmlFor={id}>{title}</label>
      <input id={id} type={type} value={value} onChange={onChange} className="form-control" required />
    </div>
  )
}

export default Input;