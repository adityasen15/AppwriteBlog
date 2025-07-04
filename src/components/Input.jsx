// import React, {useId} from 'react'

// const Input = React.forwardRef( function Input({
//     label,
//     type = "text",
//     className = "",
//     ...props
// }, ref){
//     const id = useId()
//     return (
//         <div className='w-full'>
//             {label && <label 
//             className='inline-block mb-1 pl-1' 
//             htmlFor={id}>
//                 {label}
//             </label>
//             }
//             <input
//             type={type}
//             className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
//             ref={ref}
//             {...props}
//             id={id}
//             />
//         </div>
//     )
// })

// export default Input

import React from 'react'

const Input = React.forwardRef(({ label, ...props }, ref) => {
    return (
        <div className="flex flex-col">
            {label && <label className="mb-1 text-sm text-gray-700">{label}</label>}
            <input
                ref={ref}
                {...props}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    )
})

export default Input
