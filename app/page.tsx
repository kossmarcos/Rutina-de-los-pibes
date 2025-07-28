"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Play, Pause, RotateCcw, Clock } from "lucide-react"

const workoutData = {
  "Día 1": {
    nombre: "LUNES (Empuje y Pierna)",
    ejercicios: [
      {
        nombre: "Sentadilla con Barra",
        series: "3-4",
        repeticiones: "6-10",
      },
      {
        nombre: "Press de Banca con Barra",
        series: "3-4",
        repeticiones: "6-10",
      },
      {
        nombre: "Press de Hombros con Mancuernas",
        series: "3",
        repeticiones: "8-12",
      },
      {
        nombre: "Extensiones de Cuádriceps",
        series: "3",
        repeticiones: "10-15",
      },
      {
        nombre: "Press Francés (Tríceps)",
        series: "3",
        repeticiones: "10-15",
      },
      {
        nombre: "Elevación de Gemelos",
        series: "3",
        repeticiones: "15-20",
      },
    ],
  },
  "Día 2": {
    nombre: "MIÉRCOLES (Tracción y Pierna)",
    ejercicios: [
      {
        nombre: "Peso Muerto Rumano",
        series: "3-4",
        repeticiones: "8-12",
      },
      {
        nombre: "Remo con Barra / Máquina",
        series: "3-4",
        repeticiones: "8-12",
      },
      {
        nombre: "Dominadas / Jalón al Pecho",
        series: "3",
        repeticiones: "al fallo / 8-12",
      },
      {
        nombre: "Curl de Isquiotibiales",
        series: "3",
        repeticiones: "10-15",
      },
      {
        nombre: "Curl de Bíceps con Barra/Mancuernas",
        series: "3",
        repeticiones: "10-15",
      },
      {
        nombre: "Encogimientos / Plancha",
        series: "3",
        repeticiones: "15-20 / 30-60 seg",
      },
    ],
  },
  "Día 3": {
    nombre: "VIERNES (Cuerpo Completo y Énfasis)",
    ejercicios: [
      {
        nombre: "Press de Piernas en Máquina",
        series: "3-4",
        repeticiones: "8-12",
      },
      {
        nombre: "Press Inclinado con Mancuernas",
        series: "3",
        repeticiones: "8-12",
      },
      {
        nombre: "Remo Sentado / con Mancuerna",
        series: "3",
        repeticiones: "10-15",
      },
      {
        nombre: "Elevaciones Laterales (Hombros)",
        series: "3",
        repeticiones: "12-15",
      },
      {
        nombre: "Extensiones de Tríceps en Polea",
        series: "3",
        repeticiones: "12-15",
      },
      {
        nombre: "Curl de Bíceps en Polea",
        series: "3",
        repeticiones: "12-15",
      },
      {
        nombre: "Elevaciones de Piernas Colgado / Abdominales en Máquina",
        series: "3",
        repeticiones: "al fallo / 15-20",
      },
    ],
  },
}

export default function WorkoutApp() {
  const [selectedDay, setSelectedDay] = useState("Día 1")
  const [showWarmup, setShowWarmup] = useState(false)
  const [timerSeconds, setTimerSeconds] = useState(300) // 5 minutes
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [timerFinished, setTimerFinished] = useState(false)
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set())

  const days = ["Día 1", "Día 2", "Día 3"]

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((seconds) => {
          if (seconds <= 1) {
            setIsTimerRunning(false)
            setTimerFinished(true)
            return 0
          }
          return seconds - 1
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isTimerRunning, timerSeconds])

  useEffect(() => {
    setCompletedExercises(new Set())
  }, [selectedDay])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleTimerToggle = () => {
    if (timerFinished) {
      setTimerSeconds(300)
      setTimerFinished(false)
    }
    setIsTimerRunning(!isTimerRunning)
  }

  const handleTimerReset = () => {
    setIsTimerRunning(false)
    setTimerSeconds(300)
    setTimerFinished(false)
  }

  const toggleExerciseCompletion = (exerciseName: string) => {
    setCompletedExercises((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(exerciseName)) {
        newSet.delete(exerciseName)
      } else {
        newSet.add(exerciseName)
      }
      return newSet
    })
  }

  const currentWorkout = workoutData[selectedDay as keyof typeof workoutData]

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-6">Rutina de los Pibes</h1>

          {/* Day Selector */}
          <div className="flex gap-2 justify-center mb-6">
            {days.map((day) => (
              <Button
                key={day}
                variant={selectedDay === day ? "default" : "secondary"}
                size="sm"
                onClick={() => setSelectedDay(day)}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  selectedDay === day
                    ? "bg-[#018786] hover:bg-[#03DAC6] text-white"
                    : "bg-gray-800 hover:bg-gray-700 text-white"
                }`}
              >
                {day}
              </Button>
            ))}
          </div>
        </div>

        {/* Current Day Display */}
        <div className="text-center">
          <h2 className="text-lg font-semibold mb-2">{currentWorkout.nombre}</h2>
        </div>

        {/* Warmup Section */}
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <Button
              onClick={() => setShowWarmup(!showWarmup)}
              className="w-full bg-gray-700 hover:bg-gray-600 text-white rounded-lg py-3 mb-4"
            >
              <Clock className="w-10 h-10" />
            </Button>

            {showWarmup && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Calentamiento General</h3>

                {/* Timer Display */}
                <div className="text-center space-y-4">
                  <div className="text-4xl font-mono font-bold">{formatTime(timerSeconds)}</div>

                  <div className="flex gap-2 justify-center">
                    <Button
                      onClick={handleTimerToggle}
                      className={`px-6 py-2 rounded-full ${
                        timerFinished
                          ? "bg-[#03DAC6] hover:bg-[#018786] text-black"
                          : isTimerRunning
                            ? "bg-red-600 hover:bg-red-700"
                            : "bg-[#018786] hover:bg-[#03DAC6]"
                      }`}
                    >
                      {timerFinished ? (
                        <>
                          <RotateCcw className="w-4 h-4 mr-2" />
                          Reiniciar
                        </>
                      ) : isTimerRunning ? (
                        <>
                          <Pause className="w-4 h-4 mr-2" />
                          Pausar
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Iniciar
                        </>
                      )}
                    </Button>

                    <Button
                      onClick={handleTimerReset}
                      variant="secondary"
                      className="px-6 py-2 rounded-full bg-gray-700 hover:bg-gray-600"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Reset
                    </Button>
                  </div>

                  {timerFinished && <div className="text-[#018786] font-semibold">¡Calentamiento completado!</div>}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Exercises List */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Ejercicios</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {currentWorkout.ejercicios.map((ejercicio, index) => {
              const isCompleted = completedExercises.has(ejercicio.nombre)
              return (
                <div
                  key={index}
                  onClick={() => toggleExerciseCompletion(ejercicio.nombre)}
                  className={`p-4 rounded-lg cursor-pointer transition-colors ${
                    isCompleted ? "bg-[#018786] hover:bg-[#03DAC6]" : "bg-gray-700 hover:bg-gray-600"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className={`font-medium mb-1 ${isCompleted ? "line-through text-black" : "text-white"}`}>
                        {ejercicio.nombre}
                      </h4>
                      <div
                        className={`flex gap-4 text-sm ${isCompleted ? "line-through text-gray-800" : "text-gray-300"}`}
                      >
                        <span>Series: {ejercicio.series}</span>
                        <span>Reps: {ejercicio.repeticiones}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
