import React from 'react'

const Layout = (props) => {
  return (
    <>
     <div className={`inline w-[2rem] h-[2rem] m-8 ${(props?.selectSeat.includes(props.seat) && !props?.bookedSeat.includes(props.seat))?'bg-green-500':props?.bookedSeat.includes(props.seat)?'bg-gray-300': 'border-2 border-green-500 hover:bg-green-500'}`}  disable={true} onClick={()=>props?.onSeatSelect(props.seat)}>
      {props.seat}
     </div>
    
     </>
  )
}

export default Layout;
