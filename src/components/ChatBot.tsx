import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Send } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { LLM_MODELS, ModelSelector } from "./ModelSelector"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
  model: (typeof LLM_MODELS)[number]
}



export default function ChatBot() {
  const [model, setModel] = useState<(typeof LLM_MODELS)[number]>(LLM_MODELS[0])
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Bonjour ! Comment puis-je vous aider aujourd'hui ?",
      sender: "bot",
      timestamp: new Date(),
      model: model,
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (inputValue.trim() === "") return

    const userMessage: Message = {
      id: crypto.randomUUID(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
      model: model,
    }
    setMessages((prev) => [...prev, userMessage])
    setInputValue("")

    const response = await getResponse(userMessage.text, model)


    // Simulate bot response
      const botMessage: Message = {
        id: crypto.randomUUID(),
        text: response.choices[0].message.content,
        sender: "bot",
        timestamp: new Date(),
        model: model,
      }
      setMessages((prev) => [...prev, botMessage])
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const getResponse = async (
    message: string,
    modelId: (typeof LLM_MODELS)[number]
  ) => {
    setIsLoading(true)
    const json = {
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
      model: modelId,
    }

    const baseURL = "http://127.0.0.1:1234"
    const response = await fetch(`${baseURL}/v1/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(json),
    })
    setIsLoading(false)
    return response.json()
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <Card className="w-full min-h-[80vh] max-w-4xl flex flex-col shadow-2xl">
        <CardHeader className="border-b rounded-t-lg bg-linear-to-r from-blue-500 to-purple-600">
          <CardTitle className="text-2xl font-bold text-white flex items-center justify-between gap-4">
            <span className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              ChatBot Assistant
            </span>
            <ModelSelector isLoading={isLoading} selectedModel={setModel} />
            
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages Area */}
          <div className="flex-1 p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-2xl px-4 py-3 shadow-md ${
                    message.sender === "user"
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                      : "bg-white dark:bg-slate-700 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-600"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <p
                    className={`text-xs mt-2 ${
                      message.sender === "user"
                        ? "text-blue-100"
                        : "text-slate-500 dark:text-slate-400"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString("fr-FR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t rounded-b-lg bg-white dark:bg-slate-800 p-4">
            <div className="flex gap-2">
              <Textarea
                disabled={isLoading}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={isLoading ? "Chargement..." : "Tapez votre message ici..."}
                className="resize-none min-h-[60px] max-h-[120px]"
                rows={2}
              />
              <Button
                onClick={handleSend}
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all"
                disabled={isLoading}
              >
                {isLoading ? <Loader2 className="h-5 w-5 animate-spin text-white" /> : <Send className="h-5 w-5 text-white" />}
              </Button>
            </div>
            <div className="flex justify-space-between items-center"><p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              Appuyez sur Entrée pour envoyer, Shift+Entrée pour une nouvelle ligne
            </p>
              
            </div>
            
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
