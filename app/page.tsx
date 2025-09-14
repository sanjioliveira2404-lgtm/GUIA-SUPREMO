"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dumbbell,
  Scaling as Walking,
  Utensils,
  BookOpen,
  Info,
  Activity,
  ArrowUp,
  Layers,
  Hand,
  Circle,
  Target,
  TrendingUp,
  ChevronsUp,
  Smile,
  Coffee,
  Sun,
  Candy,
  Pizza,
  Star,
  CheckCircle,
  ArrowLeft,
  Armchair,
  FileText,
  Upload,
  X,
} from "lucide-react"

type Screen = "home" | "upper-body" | "lower-body" | "meal-plan" | "guide" | "intro" | "pdf-reader"
type DetailScreen = string | null

const exerciseData = {
  peitoral: [
    {
      title: "TREINO PEITORAL - SÉRIE 1",
      exercises: [
        { name: "CROSS OVER BAIXO", series: "3", reps: "8 - 10", interval: "2 MIN" },
        { name: "SUPINO INCLINADO", series: "3", reps: "8 - 10", interval: "2 MIN" },
        { name: "CRUCIFIXO MÁQUINA", series: "3", reps: "8 - 10", interval: "90 SEG" },
        { name: "SUPINO C/ HALTERES", series: "3", reps: "10 - 12", interval: "90 SEG" },
      ],
    },
    {
      title: "TREINO PEITORAL - SÉRIE 2",
      exercises: [
        { name: "SUPINO C/ HALTERES", series: "3", reps: "8 - 12", interval: "2 MIN" },
        { name: "PRESS PEITORAL ALTO", series: "3", reps: "8 - 12", interval: "2 MIN" },
        { name: "CRUCIFIXO INCLINADO CABO", series: "3", reps: "8 - 12", interval: "2 MIN" },
        { name: "CROSS OVER", series: "3", reps: "8 - 12", interval: "2 MIN" },
      ],
    },
    {
      title: "TREINO PEITORAL - SÉRIE 3",
      exercises: [
        { name: "CROSS OVER BAIXO", series: "3", reps: "8 - 10", interval: "2 MIN" },
        { name: "PRESS PEITORAL", series: "3", reps: "8 - 10", interval: "2 MIN" },
        { name: "SUPINO INCLINADO", series: "3", reps: "8 - 10", interval: "2 MIN" },
        { name: "CRUCIFIXO C/ HALTERES", series: "3", reps: "10 - 12", interval: "90 SEG" },
      ],
    },
  ],
  ombro: [
    {
      title: "TREINO OMBRO - SÉRIE 1",
      exercises: [
        { name: "DESENVOLVIMENTO", series: "3", reps: "8 - 10", interval: "2 MIN" },
        { name: "CRUCIFIXO INVERTIDO", series: "3", reps: "8 - 10", interval: "1 MIN" },
        { name: "ELEVAÇÃO LATERAL CABO", series: "3", reps: "8 - 10", interval: "90 SEG" },
        { name: "ELEVAÇÃO LATERAL HALTER", series: "3", reps: "8 - 10", interval: "90 SEG" },
      ],
    },
    {
      title: "TREINO OMBRO - SÉRIE 2",
      exercises: [
        { name: "DESENVOLVIMENTO ARNOLD", series: "3", reps: "10 - 12", interval: "2 MIN" },
        { name: "ELEVAÇÃO LATERAL MÁQUINA", series: "3", reps: "10 - 12", interval: "2 MIN" },
        { name: "ELEVAÇÃO LATERAL CABO", series: "3", reps: "10 - 12", interval: "1 MIN" },
        { name: "CRUCIFIXO INVERTIDO CABO", series: "3", reps: "10 - 12", interval: "90 SEG" },
      ],
    },
  ],
  triceps: [
    {
      title: "TREINO TRÍCEPS - SÉRIE 1",
      exercises: [
        { name: "TRÍCEPS TESTA", series: "3", reps: "8 - 10", interval: "1 MIN" },
        { name: "TRÍCEPS PULLEY", series: "3", reps: "8 - 10", interval: "90 SEG" },
        { name: "TRÍCEPS FRANCÊS", series: "3", reps: "8 - 10", interval: "90 SEG" },
        { name: "TRÍCEPS MÁQUINA", series: "3", reps: "8 - 10", interval: "90 SEG" },
      ],
    },
    {
      title: "TREINO TRÍCEPS - SÉRIE 2",
      exercises: [
        { name: "TRÍCEPS COICE", series: "3", reps: "10 - 12", interval: "2 MIN" },
        { name: "SUPINO FECHADO", series: "3", reps: "10 - 12", interval: "2 MIN" },
        { name: "FRANCÊS NO CABO", series: "3", reps: "10 - 12", interval: "2 MIN" },
        { name: "TRÍCEPS TESTA CABO", series: "3", reps: "10 - 12", interval: "1 MIN" },
      ],
    },
  ],
  costas: [
    {
      title: "TREINO COSTAS - SÉRIE 1",
      exercises: [
        { name: "PUXADA ALTA NEUTRA", series: "3", reps: "8 - 10", interval: "2 MIN" },
        { name: "PUXADA ALTA TRIÂNGULO", series: "3", reps: "8 - 10", interval: "2 MIN" },
        { name: "REMADA ABERTA MÁQUINA", series: "3", reps: "8 - 10", interval: "2 MIN" },
        { name: "REMADA CURVADA SUPINADA", series: "3", reps: "8 - 10", interval: "2 MIN" },
      ],
    },
    {
      title: "TREINO COSTAS - SÉRIE 2",
      exercises: [
        { name: "PUXADA ALTA", series: "3", reps: "8 - 10", interval: "2 MIN" },
        { name: "REMADA SERROTE", series: "3", reps: "8 - 10", interval: "2 MIN" },
        { name: "REMADA ABERTA APOIO", series: "3", reps: "8 - 10", interval: "2 MIN" },
        { name: "PUXADA ALTA FECHADA", series: "3", reps: "8 - 10", interval: "90 SEG" },
      ],
    },
    {
      title: "TREINO COSTAS - SÉRIE 3",
      exercises: [
        { name: "FACEPULL", series: "3", reps: "6 - 8", interval: "2 MIN" },
        { name: "BARRA FIXA", series: "3", reps: "8 - 10", interval: "2 MIN" },
        { name: "PULLDOWN", series: "3", reps: "8 - 10", interval: "2 MIN" },
        { name: "REMADA CAVALINHO", series: "3", reps: "8 - 10", interval: "90 SEG" },
      ],
    },
  ],
  biceps: ["Rosca Direta - 4x12", "Rosca Alternada - 4x10", "Rosca Martelo - 3x12"],
  abdomen: ["Prancha - 3x1min", "Abdominal Infra - 3x15", "Abdominal Bicicleta - 3x20"],
  deltoides: ["Desenvolvimento Militar - 4x10", "Elevação Lateral - 4x12", "Elevação Posterior - 3x12"],
  coxas: ["Agachamento Livre - 4x10", "Leg Press - 4x12", "Cadeira Extensora - 3x15"],
  panturrilhas: ["Elevação de Panturrilha em Pé - 4x20", "Elevação de Panturrilha Sentado - 4x15"],
  gluteos: ["Hip Thrust - 4x12", "Avanço - 3x12 cada perna", "Glúteo Máquina - 3x15"],
  "cafe-manha": ["Ovos mexidos + Aveia", "Pão integral + Pasta de amendoim", "Vitamina de banana com whey"],
  "almoco-janta": [
    "Arroz integral + Frango grelhado + Salada",
    "Batata doce + Carne magra + Brócolis",
    "Peixe grelhado + Quinoa + Legumes",
  ],
  doces: ["Chocolate 70%", "Iogurte grego com mel", "Mix de castanhas"],
  salgado: ["Coxinha fit de batata doce", "Pão de queijo integral", "Wrap de frango"],
}

const workoutData = {
  peito: [
    "Cross over baixo - 4x12",
    "Supino inclinado - 4x10",
    "CRUCIFIXO MÁQUINA - 3x12",
    "SUPINO C/ HALTERES - 4x10",
    "PRESS PEITORAL ALTO - 3x12",
    "CRUCIFIXO INCLINADO CABO - 4x12",
    "CROSS OVER - 3x15",
    "PRESS PEITORAL - 4x10",
    "CRUCIFIXO C/ HALTERES - 3x12",
  ],
  costas: [
    "PUXADA ALTA NEUTRA - 3x8-10 (2min)",
    "PUXADA ALTA TRIÂNGULO - 3x8-10 (2min)",
    "REMADA ABERTA MÁQUINA - 3x8-10 (2min)",
    "REMADA CURVADA SUPINADA - 3x8-10 (2min)",
    "PUXADA ALTA - 3x8-10 (2min)",
    "REMADA SERROTE - 3x8-10 (2min)",
    "REMADA ABERTA APOIO - 3x8-10 (2min)",
    "PUXADA ALTA SUPINADA - 3x8-10 (90seg)",
    "FACEPULL - 3x6-8 (2min)",
    "BARRA FIXA - 3x8-10 (2min)",
    "PULLDOWN - 3x8-10 (2min)",
    "REMADA CAVALINHO - 3x8-10 (90seg)",
  ],
  triceps: ["FRANCÊS NO CABO - 4x12", "TRÍCEPS TESTA CABO - 3x15", "Tríceps Pulley - 4x10", "Mergulho - 3x12"],
  ombro: [
    "DESENVOLVIMENTO - 4x10",
    "CRUCIFIXO INVERTIDO - 3x12",
    "ELEVAÇÃO LATERAL CABO - 4x12",
    "ELEVAÇÃO LATERAL HALTER - 3x15",
    "DESENVOLVIMENTO ARNOLD - 4x10",
    "ELEVAÇÃO LATERAL MÁQUINA - 3x12",
    "Elevação Frontal - 3x12",
  ],
  biceps: ["Rosca Direta - 4x12", "Rosca Martelo - 3x15", "Rosca Concentrada - 3x12"],
  pernas: ["Agachamento - 4x15", "Leg Press - 4x12", "Cadeira Extensora - 3x15"],
  abdomen: ["Prancha - 3x30s", "Abdominal - 3x20", "Elevação de Pernas - 3x15"],
}

const getExerciseGifs = (exerciseName: string) => {
  const gifs: { [key: string]: string[] } = {
    "PUXADA ALTA NEUTRA": ["/images/puxada-alta-tradicional.gif", "/images/puxada-alta-polia.gif"],
    "PUXADA ALTA TRIÂNGULO": ["/images/puxada-alta-triangulo.gif"],
    "REMADA ABERTA MÁQUINA": ["/images/remada-maquina.gif"],
    "REMADA CURVADA SUPINADA": ["/images/remada-curvada-pronada.gif", "/images/remada-curvada-pronada-aberta.gif"],
    "PUXADA ALTA": ["/images/puxada-alta-tradicional-2.gif"],
    "PUXADA ALTA FECHADA": ["/images/puxada-alta-com-elastico.gif", "/images/puxada-alta-fechada.gif"],
  }
  return gifs[exerciseName] || []
}

export default function GuiaSupremoFitness() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home")
  const [detailScreen, setDetailScreen] = useState<DetailScreen>(null)
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)

  const handlePdfUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type === "application/pdf") {
      setPdfFile(file)
      const url = URL.createObjectURL(file)
      setPdfUrl(url)
    }
  }

  const closePdfReader = () => {
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl)
    }
    setPdfFile(null)
    setPdfUrl(null)
    setCurrentScreen("home")
  }

  const renderBottomNav = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800">
      <div className="flex justify-around py-2">
        {[
          { id: "upper-body", icon: Dumbbell, label: "Treino Superior" },
          { id: "lower-body", icon: Walking, label: "Treino Inferior" },
          { id: "meal-plan", icon: Utensils, label: "Plano Alimentar" },
          { id: "guide", icon: BookOpen, label: "Guia Supremo" },
          { id: "pdf-reader", icon: FileText, label: "PDF Reader" },
          { id: "intro", icon: Info, label: "Introdução" },
        ].map((tab) => (
          <Button
            key={tab.id}
            variant="ghost"
            size="sm"
            className={`flex flex-col items-center gap-1 h-auto py-2 px-3 ${
              currentScreen === tab.id ? "text-red-500" : "text-zinc-400"
            }`}
            onClick={() => {
              setCurrentScreen(tab.id as Screen)
              setDetailScreen(null)
            }}
          >
            <tab.icon className="h-5 w-5" />
            <span className="text-xs">{tab.label}</span>
          </Button>
        ))}
      </div>
    </div>
  )

  const renderExerciseList = (exercises: string[] | any[], title: string) => (
    <div className="min-h-screen bg-zinc-950 text-white p-4 pb-20">
      <div className="flex items-center gap-3 mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setDetailScreen(null)}
          className="text-white hover:bg-zinc-800"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold text-red-500">{title}</h1>
      </div>

      {(title === "Peitoral" || title === "Ombro" || title === "Tríceps" || title === "Costas e Trapézio") &&
      Array.isArray(exercises) &&
      exercises[0]?.title
        ? exercises.map((workout: any, workoutIndex: number) => (
            <Card key={workoutIndex} className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-red-500 text-lg">{workout.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {workout.exercises.map((exercise: any, exerciseIndex: number) => {
                  if (exercise.name === "REMADA SERROTE") {
                    return (
                      <div key={exerciseIndex} className="bg-zinc-800 p-4 rounded-lg">
                        <h4 className="text-white font-semibold mb-2">{exercise.name}</h4>

                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-zinc-400">SÉRIES:</span>
                            <p className="text-white font-medium">{exercise.series}</p>
                          </div>
                          <div>
                            <span className="text-zinc-400">REPETIÇÕES:</span>
                            <p className="text-white font-medium">{exercise.reps}</p>
                          </div>
                          <div>
                            <span className="text-zinc-400">INTERVALO:</span>
                            <p className="text-white font-medium">{exercise.interval}</p>
                          </div>
                        </div>

                        <div className="mt-4">
                          <h5 className="text-zinc-400 text-sm mb-2">DEMONSTRAÇÃO:</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-zinc-900 p-4 rounded-lg">
                              <img
                                src="/images/remada-serrote-bench.gif"
                                alt="Remada Serrote com Apoio"
                                className="w-full h-auto rounded-lg mb-2"
                              />
                              <p className="text-zinc-400 text-sm text-center">Remada Serrote com Apoio</p>
                            </div>
                            <div className="bg-zinc-900 p-4 rounded-lg">
                              <img
                                src="/images/remada-unilateral-standing.gif"
                                alt="Remada Unilateral em Pé"
                                className="w-full h-auto rounded-lg mb-2"
                              />
                              <p className="text-zinc-400 text-sm text-center">Remada Unilateral em Pé</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  }

                  if (exercise.name === "REMADA ABERTA APOIO") {
                    return (
                      <div key={exerciseIndex} className="bg-zinc-800 p-4 rounded-lg">
                        <h4 className="text-white font-semibold mb-2">{exercise.name}</h4>

                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-zinc-400">SÉRIES:</span>
                            <p className="text-white font-medium">{exercise.series}</p>
                          </div>
                          <div>
                            <span className="text-zinc-400">REPETIÇÕES:</span>
                            <p className="text-white font-medium">{exercise.reps}</p>
                          </div>
                          <div>
                            <span className="text-zinc-400">INTERVALO:</span>
                            <p className="text-white font-medium">{exercise.interval}</p>
                          </div>
                        </div>

                        <div className="mt-4">
                          <div className="bg-zinc-700 p-3 rounded-lg">
                            <img
                              src="/images/remada-aberta-pronada-seated.gif"
                              alt="Remada Aberta Apoio - 1° GIF"
                              className="w-full h-auto rounded"
                            />
                            <p className="text-zinc-300 text-sm mt-2 text-center">1° GIF</p>
                          </div>
                        </div>
                      </div>
                    )
                  }

                  return (
                    <div key={exerciseIndex} className="bg-zinc-800 p-4 rounded-lg">
                      <h4 className="text-white font-semibold mb-2">{exercise.name}</h4>

                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-zinc-400">SÉRIES:</span>
                          <p className="text-white font-medium">{exercise.series}</p>
                        </div>
                        <div>
                          <span className="text-zinc-400">REPETIÇÕES:</span>
                          <p className="text-white font-medium">{exercise.reps}</p>
                        </div>
                        <div>
                          <span className="text-zinc-400">INTERVALO:</span>
                          <p className="text-white font-medium">{exercise.interval}</p>
                        </div>
                      </div>

                      {exercise.name === "CROSS OVER BAIXO" && (
                        <div className="mt-4">
                          <h5 className="text-zinc-400 text-sm mb-2">DEMONSTRAÇÃO:</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-zinc-900 p-4 rounded-lg">
                              <img
                                src="/images/cross-over-1.gif"
                                alt="Cross Over Baixo - Posição 1"
                                className="w-full h-auto rounded-lg mb-2"
                              />
                              <p className="text-zinc-400 text-sm text-center">Cross Over Baixo - Posição 1</p>
                            </div>
                            <div className="bg-zinc-900 p-4 rounded-lg">
                              <img
                                src="/images/cross-over-2.gif"
                                alt="Cross Over Baixo - Posição 2"
                                className="w-full h-auto rounded-lg mb-2"
                              />
                              <p className="text-zinc-400 text-sm text-center">Cross Over Baixo - Posição 2</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {exercise.name === "SUPINO INCLINADO" && (
                        <div className="mt-4">
                          <h5 className="text-zinc-400 text-sm mb-2">DEMONSTRAÇÃO:</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-zinc-900 p-4 rounded-lg">
                              <img
                                src="/images/supino-inclinado.gif"
                                alt="Supino Inclinado com Barra"
                                className="w-full h-auto rounded-lg mb-2"
                              />
                              <p className="text-zinc-400 text-sm text-center">Supino Inclinado com Barra</p>
                            </div>
                            <div className="bg-zinc-900 p-4 rounded-lg">
                              <img
                                src="/images/supino-inclinado-halteres.gif"
                                alt="Supino Inclinado com Halteres"
                                className="w-full h-auto rounded-lg mb-2"
                              />
                              <p className="text-zinc-400 text-sm text-center">Supino Inclinado com Halteres</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {exercise.name === "CRUCIFIXO MÁQUINA" && (
                        <div className="mt-4">
                          <h5 className="text-zinc-400 text-sm mb-2">DEMONSTRAÇÃO:</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-zinc-900 p-4 rounded-lg">
                              <img
                                src="/images/crucifixo-maquina.gif"
                                alt="Crucifixo na Máquina"
                                className="w-full h-auto rounded-lg mb-2"
                              />
                              <p className="text-zinc-400 text-sm text-center">Crucifixo na Máquina</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {exercise.name === "SUPINO C/ HALTERES" && (
                        <div className="mt-4">
                          <h5 className="text-zinc-400 text-sm mb-2">DEMONSTRAÇÃO:</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-zinc-900 p-4 rounded-lg">
                              <img
                                src="/images/supino-inclinado-halteres.gif"
                                alt="Supino Inclinado com Halteres"
                                className="w-full h-auto rounded-lg mb-2"
                              />
                              <p className="text-zinc-400 text-sm text-center">Supino Inclinado com Halteres</p>
                            </div>
                            <div className="bg-zinc-900 p-4 rounded-lg">
                              <img
                                src="/images/supino-halteres.gif"
                                alt="Supino Reto com Halteres"
                                className="w-full h-auto rounded-lg mb-2"
                              />
                              <p className="text-zinc-400 text-sm text-center">Supino Reto com Halteres</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {exercise.name === "PRESS PEITORAL ALTO" && (
                        <div className="mt-4">
                          <h5 className="text-zinc-400 text-sm mb-2">DEMONSTRAÇÃO:</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-zinc-900 p-4 rounded-lg">
                              <img
                                src="/images/press-alto-inclinado.gif"
                                alt="Press Alto Inclinado"
                                className="w-full h-auto rounded-lg mb-2"
                              />
                              <p className="text-zinc-400 text-sm text-center">Press Alto Inclinado</p>
                            </div>
                            <div className="bg-zinc-900 p-4 rounded-lg">
                              <img
                                src="/images/press-peitoral-3.gif"
                                alt="Press Peitoral Máquina"
                                className="w-full h-auto rounded-lg mb-2"
                              />
                              <p className="text-zinc-400 text-sm text-center">Press Peitoral Máquina</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {exercise.name === "CRUCIFIXO INCLINADO CABO" && (
                        <div className="mt-4">
                          <h5 className="text-zinc-400 text-sm mb-2">DEMONSTRAÇÃO:</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-zinc-900 p-4 rounded-lg">
                              <img
                                src="/images/crucifixo-polia-baixa.gif"
                                alt="Crucifixo Polia Baixa"
                                className="w-full h-auto rounded-lg mb-2"
                              />
                              <p className="text-zinc-400 text-sm text-center">Crucifixo Polia Baixa</p>
                            </div>
                            <div className="bg-zinc-900 p-4 rounded-lg">
                              <img
                                src="/images/crucifixo-inclinado-cabo-2.gif"
                                alt="Crucifixo Inclinado no Cabo"
                                className="w-full h-auto rounded-lg mb-2"
                              />
                              <p className="text-zinc-400 text-sm text-center">Crucifixo Inclinado no Cabo</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {exercise.name === "CROSS OVER" && (
                        <div className="mt-4">
                          <h5 className="text-zinc-400 text-sm mb-2">DEMONSTRAÇÃO:</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-zinc-900 p-4 rounded-lg">
                              <img
                                src="/images/press-peitoral.gif"
                                alt="Press Peitoral Máquina"
                                className="w-full h-auto rounded-lg mb-2"
                              />
                              <p className="text-zinc-400 text-sm text-center">Press Peitoral Máquina</p>
                            </div>
                            <div className="bg-zinc-900 p-4 rounded-lg">
                              <img
                                src="/images/crossover.gif"
                                alt="Cross Over em Pé"
                                className="w-full h-auto rounded-lg mb-2"
                              />
                              <p className="text-zinc-400 text-sm text-center">Cross Over em Pé</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {exercise.name === "PRESS PEITORAL" && (
                        <div className="mt-4">
                          <h5 className="text-zinc-400 text-sm mb-2">DEMONSTRAÇÃO:</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-zinc-900 p-4 rounded-lg">
                              <img
                                src="/images/cable-fly.gif"
                                alt="Cable Fly na Máquina"
                                className="w-full h-auto rounded-lg mb-2"
                              />
                              <p className="text-zinc-400 text-sm text-center">Cable Fly na Máquina</p>
                            </div>
                            <div className="bg-zinc-900 p-4 rounded-lg">
                              <img
                                src="/images/press-peitoral-cabo.gif"
                                alt="Press Peitoral no Cabo"
                                className="w-full h-auto rounded-lg mb-2"
                              />
                              <p className="text-zinc-400 text-sm text-center">Press Peitoral no Cabo</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {exercise.name === "TRÍCEPS TESTA" && (
                        <div className="mt-4">
                          <h5 className="text-zinc-400 text-sm mb-2">DEMONSTRAÇÃO:</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-zinc-900 p-4 rounded-lg">
                              <img
                                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Triceps%20testa%2001-wZgNuttY4Cd6iNZ25Qa4CVBEYjYCCD.gif"
                                alt="Tríceps Testa com Barra"
                                className="w-full h-auto rounded-lg mb-2"
                              />
                              <p className="text-zinc-400 text-sm text-center">Tríceps Testa com Barra</p>
                            </div>
                            <div className="bg-zinc-900 p-4 rounded-lg">
                              <img
                                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Triceps%20testa%20com%20halteres-rHS7nZfjerXI6jKLziZpVSy2NVIxYX.gif"
                                alt="Tríceps Testa com Halteres"
                                className="w-full h-auto rounded-lg mb-2"
                              />
                              <p className="text-zinc-400 text-sm text-center">Tríceps Testa com Halteres</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {exercise.name === "TRÍCEPS PULLEY" && (
                        <div className="mt-4">
                          <h5 className="text-zinc-400 text-sm mb-2">DEMONSTRAÇÃO:</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-zinc-900 p-4 rounded-lg">
                              <img
                                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Triceps%20pulley-IVzjeIKHTbH4FTxVzdBRGEAxSkEDxR.gif"
                                alt="Tríceps Pulley"
                                className="w-full h-auto rounded-lg mb-2"
                              />
                              <p className="text-zinc-400 text-sm text-center">Tríceps Pulley</p>
                            </div>
                            <div className="bg-zinc-900 p-4 rounded-lg">
                              <img
                                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Triceps%20pulley%20pronado-quhjOqncr44IWrLfEt3AR45teGOm0c.gif"
                                alt="Tríceps Pulley Pronado"
                                className="w-full h-auto rounded-lg mb-2"
                              />
                              <p className="text-zinc-400 text-sm text-center">Tríceps Pulley Pronado</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {exercise.name === "TRÍCEPS FRANCÊS" && (
                        <div className="mt-4">
                          <h5 className="text-zinc-400 text-sm mb-2">DEMONSTRAÇÃO:</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-zinc-900 p-4 rounded-lg">
                              <img
                                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Triceps%20frances-kwJ3gvN71YdQiA0DkuMnBD1ufrdkix.gif"
                                alt="Tríceps Francês em Pé"
                                className="w-full h-auto rounded-lg mb-2"
                              />
                              <p className="text-zinc-400 text-sm text-center">Tríceps Francês em Pé</p>
                            </div>
                            <div className="bg-zinc-900 p-4 rounded-lg">
                              <img
                                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Triceps%20frances%20sentado-PdqFYEgTyH5ofBEVrp7UvgegX48W4O.gif"
                                alt="Tríceps Francês Sentado"
                                className="w-full h-auto rounded-lg mb-2"
                              />
                              <p className="text-zinc-400 text-sm text-center">Tríceps Francês Sentado</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {exercise.name === "TRÍCEPS MÁQUINA" && (
                        <div className="mt-4">
                          <h5 className="text-zinc-400 text-sm mb-2">DEMONSTRAÇÃO:</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-zinc-900 p-4 rounded-lg">
                              <img
                                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Triceps%20m%C3%A1quina%2001-GTZN6l5SWflB3vm7AVofo7uEuW5Ek1.gif"
                                alt="Tríceps Máquina - Dip Machine"
                                className="w-full h-auto rounded-lg mb-2"
                              />
                              <p className="text-zinc-400 text-sm text-center">Tríceps Máquina - Dip Machine</p>
                            </div>
                            <div className="bg-zinc-900 p-4 rounded-lg">
                              <img
                                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Triceps%20maquina%2002-vOZB2WTJzrNSdbuNmVVZmKo2Vhpb6h.gif"
                                alt="Tríceps Máquina - Press Machine"
                                className="w-full h-auto rounded-lg mb-2"
                              />
                              <p className="text-zinc-400 text-sm text-center">Tríceps Máquina - Press Machine</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {exercise.name === "TRÍCEPS COICE" && (
                        <div className="mt-4">
                          <h5 className="text-zinc-400 text-sm mb-2">DEMONSTRAÇÃO:</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-zinc-900 p-4 rounded-lg">
                              <img
                                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Triceps%20coice%20no%20cabo%20%281%29-IIhlXDTiSUv3nYS3s1krfeIvSq6BmC.gif"
                                alt="Tríceps Coice no Cabo"
                                className="w-full h-auto rounded-lg mb-2"
                              />
                              <p className="text-zinc-400 text-sm text-center">Tríceps Coice no Cabo</p>
                            </div>
                            <div className="bg-zinc-900 p-4 rounded-lg">
                              <img
                                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Triceps%20coice%20com%20halteres-xQpX85qH3sZSNHmdqnWo4hoDWvggvM.gif"
                                alt="Tríceps Coice com Halteres"
                                className="w-full h-auto rounded-lg mb-2"
                              />
                              <p className="text-zinc-400 text-sm text-center">Tríceps Coice com Halteres</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {exercise.name === "SUPINO FECHADO" && (
                        <div className="mt-4">
                          <h5 className="text-zinc-400 text-sm mb-2">DEMONSTRAÇÃO:</h5>
                          <div className="grid grid-cols-1 gap-4">
                            <div className="bg-zinc-900 p-4 rounded-lg">
                              <img
                                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Supino%20fechado%20com%20halteres-V8BqFFtejcUhfgR5Nan1uS80aGeUWV.gif"
                                alt="Supino Fechado com Halteres"
                                className="w-full h-auto rounded-lg mb-2"
                              />
                              <p className="text-zinc-400 text-sm text-center">Supino Fechado com Halteres</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {exercise.name === "CRUCIFIXO C/ HALTERES" && (
                        <div className="mt-4">
                          <h5 className="text-zinc-400 text-sm mb-2">DEMONSTRAÇÃO:</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-zinc-900 p-4 rounded-lg">
                              <img
                                src="/images/crucifixo-inclinado-halteres.gif"
                                alt="Crucifixo Inclinado com Halteres"
                                className="w-full h-auto rounded-lg mb-2"
                              />
                              <p className="text-zinc-400 text-sm text-center">Crucifixo Inclinado com Halteres</p>
                            </div>
                            <div className="bg-zinc-900 p-4 rounded-lg">
                              <img
                                src="/images/crucifixo-halteres.gif"
                                alt="Crucifixo Reto com Halteres"
                                className="w-full h-auto rounded-lg mb-2"
                              />
                              <p className="text-zinc-400 text-sm text-center">Crucifixo Reto com Halteres</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {exercise.name === "FRANCÊS NO CABO" && (
                        <div className="mt-4">
                          <h5 className="text-zinc-400 text-sm mb-2">DEMONSTRAÇÃO:</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-zinc-900 p-4 rounded-lg">
                              <img
                                src="/images/triceps-testa-cabo.gif"
                                alt="Tríceps Testa no Cabo"
                                className="w-full h-auto rounded-lg mb-2"
                              />
                              <p className="text-zinc-400 text-sm text-center">Tríceps Testa no Cabo</p>
                            </div>
                            <div className="bg-zinc-900 p-4 rounded-lg">
                              <img
                                src="/images/triceps-testa-inclinado.gif"
                                alt="Tríceps Testa Inclinado"
                                className="w-full h-auto rounded-lg mb-2"
                              />
                              <p className="text-zinc-400 text-sm text-center">Tríceps Testa Inclinado</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {exercise.name === "TRÍCEPS TESTA CABO" && (
                        <div className="mt-4">
                          <h5 className="text-zinc-400 text-sm mb-2">DEMONSTRAÇÃO:</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-zinc-900 p-4 rounded-lg">
                              <img
                                src="/images/triceps-frances-unilateral-cabo.gif"
                                alt="Tríceps Francês Unilateral no Cabo"
                                className="w-full h-auto rounded-lg mb-2"
                              />
                              <p className="text-zinc-400 text-sm text-center">Tríceps Francês Unilateral no Cabo</p>
                            </div>
                            <div className="bg-zinc-900 p-4 rounded-lg">
                              <img
                                src="/images/triceps-frances-cabo-corda.gif"
                                alt="Tríceps Francês no Cabo com Corda"
                                className="w-full h-auto rounded-lg mb-2"
                              />
                              <p className="text-zinc-400 text-sm text-center">Tríceps Francês no Cabo com Corda</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {exercise.name === "DESENVOLVIMENTO" && (
                        <div className="mt-4">
                          <h5 className="text-zinc-400 text-sm mb-2">DEMONSTRAÇÃO:</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-zinc-900 p-4 rounded-lg">
                              <img
                                src="/images/desenvolvimento-halteres-sentado.gif"
                                alt="Desenvolvimento com Halteres Sentado"
                                className="w-full h-auto rounded-lg mb-2"
                              />
                              <p className="text-zinc-400 text-sm text-center">Desenvolvimento com Halteres Sentado</p>
                            </div>
                            <div className="bg-zinc-900 p-4 rounded-lg">
                              <img
                                src="/images/desenvolvimento-em-pe.gif"
                                alt="Desenvolvimento em Pé"
                                className="w-full h-auto rounded-lg mb-2"
                              />
                              <p className="text-zinc-400 text-sm text-center">Desenvolvimento em Pé</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {exercise.name === "CRUCIFIXO INVERTIDO" && (
                        <div className="mt-4">
                          <h5 className="text-zinc-400 text-sm mb-2">DEMONSTRAÇÃO:</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-zinc-900 p-4 rounded-lg">
                              <img
                                src="/images/crucifixo-invertido-elastico.gif"
                                alt="Crucifixo Invertido com Elástico"
                                className="w-full h-auto rounded-lg mb-2"
                              />
                              <p className="text-zinc-400 text-sm text-center">Crucifixo Invertido com Elástico</p>
                            </div>
                            <div className="bg-zinc-900 p-4 rounded-lg">
                              <img
                                src="/images/crucifixo-invertido-cabo.gif"
                                alt="Crucifixo Invertido no Cabo"
                                className="w-full h-auto rounded-lg mb-2"
                              />
                              <p className="text-zinc-400 text-sm text-center">Crucifixo Invertido no Cabo</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {exercise.name === "ELEVAÇÃO LATERAL CABO" && (
                        <div className="mt-4">
                          <h5 className="text-zinc-400 text-sm mb-2">DEMONSTRAÇÃO:</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-zinc-900 p-4 rounded-lg">
                              <img
                                src="/images/elevacao-lateral-inclinado-cabo.gif"
                                alt="Elevação Lateral Inclinado no Cabo"
                                className="w-full h-auto rounded-lg mb-2"
                              />
                              <p className="text-zinc-400 text-sm text-center">Elevação Lateral Inclinado no Cabo</p>
                            </div>
                            <div className="bg-zinc-900 p-4 rounded-lg">
                              <img
                                src="/images/elevacao-lateral-cabo.gif"
                                alt="Elevação Lateral no Cabo"
                                className="w-full h-auto rounded-lg mb-2"
                              />
                              <p className="text-zinc-400 text-sm text-center">Elevação Lateral no Cabo</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {exercise.name === "ELEVAÇÃO LATERAL HALTER" && (
                        <div className="mt-4">
                          <h5 className="text-zinc-400 text-sm mb-2">DEMONSTRAÇÃO:</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-zinc-900 p-4 rounded-lg">
                              <img
                                src="/images/elevacao-lateral-01.gif"
                                alt="Elevação Lateral em Pé"
                                className="w-full h-auto rounded-lg mb-2"
                              />
                              <p className="text-zinc-400 text-sm text-center">Elevação Lateral em Pé</p>
                            </div>
                            <div className="bg-zinc-900 p-4 rounded-lg">
                              <img
                                src="/images/elevacao-lateral-4.gif"
                                alt="Elevação Lateral Sentado"
                                className="w-full h-auto rounded-lg mb-2"
                              />
                              <p className="text-zinc-400 text-sm text-center">Elevação Lateral Sentado</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {exercise.name === "DESENVOLVIMENTO ARNOLD" && (
                        <div className="mt-4">
                          <h5 className="text-zinc-400 text-sm mb-2">DEMONSTRAÇÃO:</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-zinc-900 p-4 rounded-lg">
                              <img
                                src="/images/arnold-press-feminino.gif"
                                alt="Arnold Press Feminino"
                                className="w-full h-auto rounded-lg mb-2"
                              />
                              <p className="text-zinc-400 text-sm text-center">Arnold Press Feminino</p>
                            </div>
                            <div className="bg-zinc-900 p-4 rounded-lg">
                              <img
                                src="/images/arnold-press.gif"
                                alt="Arnold Press"
                                className="w-full h-auto rounded-lg mb-2"
                              />
                              <p className="text-zinc-400 text-sm text-center">Arnold Press</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {exercise.name === "ELEVAÇÃO LATERAL MÁQUINA" && (
                        <div className="mt-4">
                          <h5 className="text-zinc-400 text-sm mb-2">DEMONSTRAÇÃO:</h5>
                          <div className="grid grid-cols-1 gap-4">
                            <div className="bg-zinc-900 p-4 rounded-lg">
                              <img
                                src="/images/lateral-raise-machine.gif"
                                alt="Elevação Lateral na Máquina"
                                className="w-full h-auto rounded-lg mb-2"
                              />
                              <p className="text-zinc-400 text-sm text-center">Elevação Lateral na Máquina</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {exercise.name === "CRUCIFIXO INVERTIDO CABO" && (
                        <div className="mt-4">
                          <h5 className="text-zinc-400 text-sm mb-2">DEMONSTRAÇÃO:</h5>
                          <div className="grid grid-cols-1 gap-4">
                            <div className="bg-zinc-900 p-4 rounded-lg">
                              <img
                                src="/images/crucifixo-invertido-cabo.gif"
                                alt="Crucifixo Invertido no Cabo"
                                className="w-full h-auto rounded-lg mb-2"
                              />
                              <p className="text-zinc-400 text-sm text-center">Crucifixo Invertido no Cabo</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {exercise.name === "PUXADA ALTA NEUTRA" && (
                        <div className="mt-4">
                          <h5 className="text-zinc-400 text-sm mb-2">DEMONSTRAÇÃO:</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {getExerciseGifs("PUXADA ALTA NEUTRA").map((gif, index) => (
                              <div key={index} className="bg-zinc-900 p-4 rounded-lg">
                                <img
                                  src={gif || "/placeholder.svg"}
                                  alt={`Puxada Alta Neutra - Posição ${index + 1}`}
                                  className="w-full h-auto rounded-lg mb-2"
                                />
                                <p className="text-zinc-400 text-sm text-center">
                                  Puxada Alta Neutra - Posição {index + 1}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {exercise.name === "PUXADA ALTA TRIÂNGULO" && (
                        <div className="mt-4">
                          <h5 className="text-zinc-400 text-sm mb-2">DEMONSTRAÇÃO:</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {getExerciseGifs("PUXADA ALTA TRIÂNGULO").map((gif, index) => (
                              <div key={index} className="bg-zinc-900 p-4 rounded-lg">
                                <img
                                  src={gif || "/placeholder.svg"}
                                  alt={`Puxada Alta Triângulo - Posição ${index + 1}`}
                                  className="w-full h-auto rounded-lg mb-2"
                                />
                                <p className="text-zinc-400 text-sm text-center">
                                  Puxada Alta Triângulo - Posição {index + 1}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {exercise.name === "REMADA ABERTA MÁQUINA" && (
                        <div className="mt-4">
                          <h5 className="text-zinc-400 text-sm mb-2">DEMONSTRAÇÃO:</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {getExerciseGifs("REMADA ABERTA MÁQUINA").map((gif, index) => (
                              <div key={index} className="bg-zinc-900 p-4 rounded-lg">
                                <img
                                  src={gif || "/placeholder.svg"}
                                  alt={`Remada Aberta Máquina - Posição ${index + 1}`}
                                  className="w-full h-auto rounded-lg mb-2"
                                />
                                <p className="text-zinc-400 text-sm text-center">
                                  Remada Aberta Máquina - Posição {index + 1}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {exercise.name === "REMADA CURVADA SUPINADA" && (
                        <div className="mt-4">
                          <h5 className="text-zinc-400 text-sm mb-2">DEMONSTRAÇÃO:</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {getExerciseGifs("REMADA CURVADA SUPINADA").map((gif, index) => (
                              <div key={index} className="bg-zinc-900 p-4 rounded-lg">
                                <img
                                  src={gif || "/placeholder.svg"}
                                  alt={`Remada Curvada Supinada - Posição ${index + 1}`}
                                  className="w-full h-auto rounded-lg mb-2"
                                />
                                <p className="text-zinc-400 text-sm text-center">
                                  Remada Curvada Supinada - Posição {index + 1}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {exercise.name === "PUXADA ALTA" && (
                        <div className="mt-4">
                          <h5 className="text-zinc-400 text-sm mb-2">DEMONSTRAÇÃO:</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {getExerciseGifs("PUXADA ALTA").map((gif, index) => (
                              <div key={index} className="bg-zinc-900 p-4 rounded-lg">
                                <img
                                  src={gif || "/placeholder.svg"}
                                  alt={`Puxada Alta - Posição ${index + 1}`}
                                  className="w-full h-auto rounded-lg mb-2"
                                />
                                <p className="text-zinc-400 text-sm text-center">Puxada Alta - Posição {index + 1}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {exercise.name === "PUXADA ALTA FECHADA" && (
                        <div className="mt-4">
                          <h5 className="text-zinc-400 text-sm mb-2">DEMONSTRAÇÃO:</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {getExerciseGifs("PUXADA ALTA FECHADA").map((gif, index) => (
                              <div key={index} className="bg-zinc-900 p-4 rounded-lg">
                                <img
                                  src={gif || "/placeholder.svg"}
                                  alt={`Puxada Alta Fechada - Posição ${index + 1}`}
                                  className="w-full h-auto rounded-lg mb-2"
                                />
                                <p className="text-zinc-400 text-sm text-center">
                                  Puxada Alta Fechada - Posição {index + 1}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {exercise.name === "BARRA FIXA" && (
                        <div className="mt-4">
                          <h5 className="text-zinc-400 text-sm mb-2">DEMONSTRAÇÃO:</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-zinc-900 p-4 rounded-lg">
                              <img
                                src="/images/barra-fixa-pegada-aberta.gif"
                                alt="Barra Fixa - Pegada Aberta"
                                className="w-full h-auto rounded-lg mb-2"
                              />
                              <p className="text-zinc-400 text-sm text-center">Barra Fixa - Pegada Aberta</p>
                            </div>
                            <div className="bg-zinc-900 p-4 rounded-lg">
                              <img
                                src="/images/barra-fixa-nuca.gif"
                                alt="Barra Fixa - Nuca"
                                className="w-full h-auto rounded-lg mb-2"
                              />
                              <p className="text-zinc-400 text-sm text-center">Barra Fixa - Nuca</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {exercise.name === "FACEPULL" && (
                        <div className="mt-4">
                          <h5 className="text-zinc-400 text-sm mb-2">DEMONSTRAÇÃO:</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-zinc-900 p-4 rounded-lg">
                              <img
                                src="/images/facepull.gif"
                                alt="Facepull"
                                className="w-full h-auto rounded-lg mb-2"
                              />
                              <p className="text-zinc-400 text-sm text-center">Facepull</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {exercise.name === "PULLDOWN" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <img
                              src="/images/pulldown1.gif"
                              alt="Pulldown exercise demonstration - position 1"
                              className="w-full h-auto rounded-lg"
                            />
                            <p className="text-sm text-gray-600 mt-2 text-center">Posição 1</p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <img
                              src="/images/pulldown-com-corda.gif"
                              alt="Pulldown exercise demonstration - position 2"
                              className="w-full h-auto rounded-lg"
                            />
                            <p className="text-sm text-gray-600 mt-2 text-center">Posição 2</p>
                          </div>
                        </div>
                      )}

                      {exercise.name === "REMADA CAVALINHO" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <img
                              src="/images/remada-cavalinho.gif"
                              alt="Remada Cavalinho - Posição 1"
                              className="w-full h-auto rounded-lg"
                            />
                            <p className="text-sm text-gray-600 mt-2 text-center">Posição 1</p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <img
                              src="/images/remada-cavalinho-barra.gif"
                              alt="Remada Cavalinho - Posição 2"
                              className="w-full h-auto rounded-lg"
                            />
                            <p className="text-sm text-gray-600 mt-2 text-center">Posição 2</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          ))
        : exercises.map((exercise: string, index: number) => (
            <Card key={index} className="bg-zinc-900 border-zinc-800 hover:bg-zinc-800 transition-colors">
              <CardContent className="p-4">
                <p className="text-white font-medium">{exercise}</p>
              </CardContent>
            </Card>
          ))}
    </div>
  )

  const renderScreen = () => {
    switch (currentScreen) {
      case "pdf-reader":
        return (
          <div className="p-4 pb-20">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="h-6 w-6 text-red-500" />
              <h1 className="text-2xl font-bold text-white">Leitor de PDF</h1>
            </div>

            {!pdfFile ? (
              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="p-8 text-center">
                  <Upload className="h-16 w-16 mx-auto mb-4 text-zinc-400" />
                  <h3 className="text-xl font-semibold text-white mb-2">Carregar PDF</h3>
                  <p className="text-zinc-400 mb-6">Selecione um arquivo PDF para visualizar</p>
                  <Input
                    type="file"
                    accept=".pdf"
                    onChange={handlePdfUpload}
                    className="bg-zinc-800 border-zinc-700 text-white file:bg-red-500 file:text-white file:border-0 file:rounded file:px-4 file:py-2 file:mr-4"
                  />
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-zinc-900 p-4 rounded-lg border border-zinc-800">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-red-500" />
                    <span className="text-white font-medium">{pdfFile.name}</span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={closePdfReader} className="text-zinc-400 hover:text-white">
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <Card className="bg-zinc-900 border-zinc-800">
                  <CardContent className="p-0">
                    {pdfUrl && <iframe src={pdfUrl} className="w-full h-[70vh] rounded-lg" title="PDF Viewer" />}
                  </CardContent>
                </Card>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 border-red-500 text-red-400 hover:bg-red-500 hover:text-white bg-transparent"
                    onClick={() => {
                      const input = document.createElement("input")
                      input.type = "file"
                      input.accept = ".pdf"
                      input.onchange = handlePdfUpload
                      input.click()
                    }}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Carregar Outro PDF
                  </Button>
                </div>
              </div>
            )}
          </div>
        )

      case "upper-body":
        return (
          <div className="grid grid-cols-2 gap-4 p-4 pb-20">
            {[
              { id: "peitoral", title: "Peitoral", icon: Activity },
              { id: "ombro", title: "Ombro", icon: Armchair },
              { id: "triceps", title: "Tríceps", icon: ArrowUp },
              { id: "costas", title: "Costas e Trapézio", icon: Layers },
              { id: "biceps", title: "Bíceps", icon: Hand },
              { id: "abdomen", title: "Abdômen", icon: Circle },
              { id: "deltoides", title: "Deltoides", icon: Target },
            ].map((card) => (
              <Card
                key={card.id}
                className="bg-zinc-900 border-zinc-800 hover:bg-zinc-800 transition-all hover:scale-105 cursor-pointer"
                onClick={() => setDetailScreen(card.id)}
              >
                <CardContent className="p-6 text-center">
                  <card.icon className="h-8 w-8 mx-auto mb-3 text-red-500" />
                  <h3 className="font-semibold text-white">{card.title}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        )

      case "lower-body":
        return (
          <div className="grid grid-cols-2 gap-4 p-4 pb-20">
            {[
              { id: "coxas", title: "Coxas", icon: TrendingUp },
              { id: "panturrilhas", title: "Panturrilhas", icon: ChevronsUp },
              { id: "gluteos", title: "Glúteos", icon: Smile },
            ].map((card) => (
              <Card
                key={card.id}
                className="bg-zinc-900 border-zinc-800 hover:bg-zinc-800 transition-all hover:scale-105 cursor-pointer"
                onClick={() => setDetailScreen(card.id)}
              >
                <CardContent className="p-6 text-center">
                  <card.icon className="h-8 w-8 mx-auto mb-3 text-red-500" />
                  <h3 className="font-semibold text-white">{card.title}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        )

      case "meal-plan":
        return (
          <div className="grid grid-cols-2 gap-4 p-4 pb-20">
            {[
              { id: "cafe-manha", title: "Café da Manhã", icon: Coffee },
              { id: "almoco-janta", title: "Almoço e Janta", icon: Sun },
              { id: "doces", title: "Doces", icon: Candy },
              { id: "salgado", title: "Salgado", icon: Pizza },
            ].map((card) => (
              <Card
                key={card.id}
                className="bg-zinc-900 border-zinc-800 hover:bg-zinc-800 transition-all hover:scale-105 cursor-pointer"
                onClick={() => setDetailScreen(card.id)}
              >
                <CardContent className="p-6 text-center">
                  <card.icon className="h-8 w-8 mx-auto mb-3 text-red-500" />
                  <h3 className="font-semibold text-white">{card.title}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        )

      case "guide":
        return (
          <div className="p-4 pb-20 space-y-4">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-white">
                  <Star className="h-6 w-6 text-red-500" />
                  Ficha Suprema
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-300">
                  Ficha Suprema: programa avançado de treino e dieta para resultados máximos. Inclui divisão ABCDE e
                  plano alimentar ajustado.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-white">
                  <CheckCircle className="h-6 w-6 text-red-500" />
                  Ficha Completa
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-300">
                  Ficha Completa: divisão equilibrada de treinos (superior/inferior) com suporte alimentar básico. Ideal
                  para iniciantes.
                </p>
              </CardContent>
            </Card>
          </div>
        )

      case "intro":
        return (
          <div className="p-4 pb-20">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-2xl text-red-500 text-center">Bem-vindo ao Guia Supremo!</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-300 text-center leading-relaxed">
                  Bem-vindo ao Guia Supremo de Treino e Alimentação! Aqui você encontra sua ficha de treinos, plano
                  alimentar e orientações para alcançar seus objetivos de forma prática.
                </p>
              </CardContent>
            </Card>
          </div>
        )

      default:
        return (
          <div className="p-4 pb-20">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-red-500 mb-2">Guia Supremo Fitness</h1>
              <p className="text-zinc-400">Seu guia completo de treino e alimentação</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {[
                {
                  id: "upper-body",
                  title: "Treino Superior",
                  icon: Dumbbell,
                  desc: "Exercícios para membros superiores",
                },
                {
                  id: "lower-body",
                  title: "Treino Inferior",
                  icon: Walking,
                  desc: "Exercícios para membros inferiores",
                },
                { id: "meal-plan", title: "Plano Alimentar", icon: Utensils, desc: "Guia de alimentação saudável" },
                { id: "guide", title: "Guia Supremo", icon: BookOpen, desc: "Fichas e programas de treino" },
                { id: "pdf-reader", icon: FileText, label: "Leitor de PDF" },
                { id: "intro", title: "Introdução", icon: Info, desc: "Informações sobre o app" },
              ].map((item) => (
                <Card
                  key={item.id}
                  className="bg-zinc-900 border-zinc-800 hover:bg-zinc-800 transition-all hover:scale-105 cursor-pointer"
                  onClick={() => setCurrentScreen(item.id as Screen)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <item.icon className="h-8 w-8 text-red-500" />
                      <div>
                        <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                        <p className="text-sm text-zinc-400">{item.desc}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )
    }
  }

  if (detailScreen) {
    const exercises = exerciseData[detailScreen as keyof typeof exerciseData]
    const titles = {
      peitoral: "Peitoral",
      ombro: "Ombro",
      triceps: "Tríceps",
      costas: "Costas e Trapézio",
      biceps: "Bíceps",
      abdomen: "Abdômen",
      deltoides: "Deltoides",
      coxas: "Coxas",
      panturrilhas: "Panturrilhas",
      gluteos: "Glúteos",
      "cafe-manha": "Café da Manhã",
      "almoco-janta": "Almoço e Janta",
      doces: "Doces",
      salgado: "Salgado",
    }
    return renderExerciseList(exercises, titles[detailScreen as keyof typeof titles])
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {renderScreen()}
      {renderBottomNav()}
    </div>
  )
}
