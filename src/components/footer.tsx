import { useState } from "react"

export function Footer() {
  return (
    <div className="absolute bottom-0 left-0 w-full h-10 p-10 flex items-center justify-center">
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-md opacity-50">Submitted by:</h1>
            <span className="text-md opacity-50">Lyra G. Sta. Juana & Karyl Kim Lorcha</span>
        </div>
    </div>
  )
}