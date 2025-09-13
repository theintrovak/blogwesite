import React, { useId } from 'react'

function Select({
    options,
    label,
    className = "",
    ...props
}, ref) {
    const id = useId();

    return (
        <div className='w-full'>
            {label && <label className='text-gray-700 inline-block pl-1 mb-1' htmlFor={id}>{label}</label>}
            <select {...props} id={id} ref={ref} className={`border border-gray-300 rounded-md p-2 w-full ${className}`}>
                {
                    options.map((option) => (
                        <option key={option} value={option}>{option}</option>

                    ))
                }
            </select>
        </div>
    )
}
export default React.forwardRef(Select)