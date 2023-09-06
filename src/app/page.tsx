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
  const [calcMode, setCalcMode] = useState<'diference' | 'consumed'>('diference')

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
          consumedCalculated = consumedCalculated + parseInt(fees[i].consumed) * parseFloat(fees[i].fee)
          consumedRest = consumedRest - parseInt(fees[i].consumed)
        } else {
          consumedCalculated = consumedCalculated + consumedRest * parseFloat(fees[i].fee)
          consumedRest = 0
        }
      } else {
        consumedCalculated = consumedCalculated + consumedRest * parseFloat(fees[i].fee)
        consumedRest = 0
      }
      i++
    }

    setResultB2(consumedCalculated)
    setConsumed(consumed)
    setResultB6(b6)
  }

  const restart = () => {
    setLastMonth(0)
    setThisMonth(0)
    setResultB2(0)
    setResultB6(0)
    setConsumed(0)
  }

  const alternateMode = () => {
    switch (calcMode) {
      case 'consumed':
        setCalcMode('diference')
        break;

      case 'diference':
        setCalcMode('consumed')
        setLastMonth(0)
        break;

      default:
        break;
    }
  }

  return (
    <main className="flex min-h-screen w-screen flex-col items-center sm:justify-center sm:py-0 transition-all duration-500">
      <h1 className="text-3xl my-4 text-orange-400 font-bold">MiPagoB6</h1>
      <div className="w-full px-3 sm:w-auto sm:px-0">
        <div className="mb-3">
          <p className="text-xl">Consumo: <strong>{consumed} kWh</strong></p>
          <p className="text-xl">A pagar normal: <strong>{resultB2.toFixed(2)} CUP</strong></p>
          <p className="text-xl">A pagar B6: <strong>{resultB6.toFixed(2)} CUP</strong></p>
        </div>
        <div>
          {
            calcMode === 'diference'
              ? (
                <div className="flex gap-2 justify-center py-2">
                  <div className="flex flex-col gap-3 w-1/2">
                    <input onChange={e => handleLastMonth(e)} type="number" placeholder="Lectura anterior" min={0} className="text-black shadow-md rounded p-3 focus:outline-amber-500 transition-all duration-500 w-auto" value={lastMonth} />
                    <sub>Lectura anterior</sub>
                  </div>
                  <div className="flex flex-col gap-3 w-1/2">
                    <input onChange={e => handleThisMonth(e)} type="number" placeholder="Lectura actual" min={0} className="text-black shadow-md rounded p-3 focus:outline-amber-500 transition-all duration-500 w-auto" value={thisMonth} />
                    <sub>Lectura actual</sub>
                  </div>
                </div>
              )
              : (
                <div className="flex flex-col gap-3 py-2">
                  <input onChange={e => handleThisMonth(e)} type="number" placeholder="kWh consumido" min={0} className="text-black shadow-md rounded p-3 focus:outline-amber-500 transition-all duration-500 w-full" value={thisMonth} />
                  <sub>kWh consumido</sub>
                </div>
              )
          }
          <div className="flex flex-col gap-3 mt-4">
            <div className="flex gap-3">
              <button onClick={calculation} className="hover:shadow-lg transition-all duration-500 bg-orange-400 bg-opacity-50 py-3 rounded w-full text-white font-bold text-xl">Calcular</button>
              <button onClick={alternateMode} className="hover:shadow-lg transition-all duration-500 bg-orange-400 bg-opacity-50 py-3 rounded px-4 text-white font-bold text-xl">Alt</button>
            </div>
            <button onClick={restart} className="hover:shadow-lg transition-all duration-500 bg-orange-400 bg-opacity-50 py-3 rounded w-full text-white font-bold text-xl">Reiniciar</button>
          </div>
        </div>
      </div>
    </main>
  )
}
