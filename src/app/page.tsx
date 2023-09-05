'use client'
import { ChangeEvent, useState } from "react"
import { fees } from "./fee"
import React from "react"

export default function Home() {
  const [lastMonth, setLastMonth] = useState<number>(0)
  const [thisMonth, setThisMonth] = useState<number>(0)
  const [resultB2, setResultB2] = useState<number>(0)
  const [resultB6, setResultB6] = useState<number>(0)
  const [consumed, setConsumed] = useState<number>(0)

  const handleLastMonth = (e: ChangeEvent<HTMLInputElement>) => {
    setLastMonth(parseInt(e.target.value))
  }

  const handleThisMonth = (e: ChangeEvent<HTMLInputElement>) => {
    setThisMonth(parseInt(e.target.value))
  }

  const calculation = () => {
    const b6 = (thisMonth - lastMonth - 250) * 3.12 + 281
    const consumed = thisMonth - lastMonth

    let consumedRest = consumed
    let consumedCalculated = 0
    let i = 0
    while (consumedRest !== 0) {
      if (fees[i].consumed !== '+5000'){
        if (consumedRest >= parseInt(fees[i].consumed)) {
          consumedCalculated = consumedCalculated + parseInt(fees[i].consumed) * parseInt(fees[i].fee)
          consumedRest = consumedRest - parseInt(fees[i].consumed)
        } else {
          consumedCalculated = consumedCalculated + consumedRest * parseInt(fees[i].fee)
          consumedRest = 0
        }
      } else {
        consumedCalculated = consumedCalculated + consumedRest * parseInt(fees[i].fee)
        consumedRest = 0
      }
      i++
    }

    setResultB2(consumedCalculated)
    setConsumed(consumed)
    setResultB6(b6)
  }

  return (
    <main className="flex min-h-screen flex-col items-center sm:justify-center py-4 sm:py-0">
      <div>
        <div className="mb-3">
          <p className="text-xl">Consumo: <strong>{consumed} kWh</strong></p>
          <p className="text-xl">A pagar B2: <strong>{resultB2.toFixed(2)} CUP</strong></p>
          <p className="text-xl">A pagar B6: <strong>{resultB6.toFixed(2)} CUP</strong></p>
        </div>
        <div>
          <div className="flex sm:flex-row flex-col gap-3">
            <input onChange={e => handleLastMonth(e)} type="number" placeholder="Lectura anterior" min={0} className="text-black shadow-md rounded p-3 focus:outline-amber-500 transition-all duration-500"></input>
            <input onChange={e => handleThisMonth(e)} type="number" placeholder="Lectura actual" min={0} className="text-black shadow-md rounded p-3 focus:outline-amber-500 transition-all duration-500"></input>
          </div>
          <button onClick={calculation} className="hover:shadow-lg transition-all duration-500 bg-orange-400 bg-opacity-50 py-3 my-4 rounded w-full text-white font-bold text-xl">Calcular</button>
        </div>
      </div>
    </main>
  )
}
