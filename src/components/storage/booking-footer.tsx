import React from 'react'
import BookingSched from './booking-sched'
import BookingForm from './booking-form'

export default function BookingFooter() {
  return (
    <div className="flex bg-[#2A2C2D] rounded-t-2xl w-full h-full items-center main-storage">
        <div className="w-full h-full flex justify-center relative">
          <BookingSched></BookingSched>
        </div>
        <div className="w-full h-full flex justify-center relative">
          <BookingForm></BookingForm>
        </div>
      </div>
  )
}
