import { useState } from "react";

const useField = (type) => {
  const [value, setVal] = useState('')

  const onChange = (e) => {
    setVal(e.target.value)
  }

  return {
    onChange,
    type,
    value,
  }
}

export default useField