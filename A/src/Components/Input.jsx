import React, { useId } from 'react'

const Input = React.forwardRef(function Input(
    {
        label,
        className = "",
        type = "text",
        ...props },
    ref) {
    const id = useId()
    return (
        <div className='w-full'>
            {label && <label className='text-gray-700  inline-block pl-1 mb-1' htmlFor={id}>{label}</label>}
            <div className='w-full'> <input type={type} className={`border border-gray-300 rounded-md p-2 w-full ${className}`} {...props} id={id} ref={ref} />
            </div>
        </div>
    )

})

export default Input