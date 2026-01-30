import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

export const LLM_MODELS = [
  "llama-3.2-3b-instruct",
  "qwen2.5-coder-7b-instruct",
] as const

type modelProps = {
  isLoading: boolean
  selectedModel: (v: (typeof LLM_MODELS)[number]) => void
}

export const ModelSelector = ({ isLoading, selectedModel }: modelProps) => {
const [model, setModel] = useState<(typeof LLM_MODELS)[number]>(LLM_MODELS[0])

  const handleModelChange = (v: (typeof LLM_MODELS)[number]) => {
    setModel(v)
    selectedModel(v)
  }

  return (
    <Select value={model} onValueChange={handleModelChange} disabled={isLoading}>
              <SelectTrigger className="w-[220px] bg-white/20 border-white/30 text-white hover:bg-white/30">
                <SelectValue placeholder="Modèle" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-slate-700 text-slate-900">
                <SelectItem value={LLM_MODELS[0]} className="text-slate-900 hover:bg-slate-200">{LLM_MODELS[0]}</SelectItem>
                <SelectItem value={LLM_MODELS[1]} className="text-slate-900 hover:bg-slate-200">{LLM_MODELS[1]}</SelectItem>
              </SelectContent>
            </Select>
  )
}