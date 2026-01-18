import React from 'react'

function Containter(
    {
        children,
      }: {
        children: React.ReactNode;
      }) {
  return (
    <div className="max-w-[85vw] mx-auto">
        {children}
    </div>
  )
}

export default Containter