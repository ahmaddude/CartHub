import React from 'react'

const Input=({icon:Icon,...props})=> {
  return (
    <div className='relative mb-6'>
      <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
        <Icon className="size-5 text-[#8A8577]" />
      </div>
      <input {...props}
      className='w-full pl-10 pr-3 py-2.5 bg-white rounded-lg border border-[#1C1B1A]/20
      focus:border-[#C9A227] focus:ring-2 focus:ring-[#C9A227]/20 text-[#1C1B1A] placeholder-[#8A8577] transition duration-200'
      />
    </div>
  )
}

export default Input