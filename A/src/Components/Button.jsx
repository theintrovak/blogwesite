import React from 'react'

function Button({ children
    , type = "button"
    , bgColor = "bg-black"
    , textColor = "text-white"
    , className = ""
    , ...props
}) {

    return (
        <button className={` hover:bg-amber-700  font-bold py-2 px-4 rounded ${className}  ${bgColor} ${textColor}  `} {...props} type={type}>{children}</button>
    )
}

export default Button