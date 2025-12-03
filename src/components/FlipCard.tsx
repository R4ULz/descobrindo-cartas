import { CircleQuestionMark } from "lucide-react";
import { useState } from "react";

interface FlipCardProps{
    emoji: string;
    isFlipped?: boolean;
}

export default function FlipCard({emoji, isFlipped = false}: FlipCardProps){
    const [isFlippedState, setIsFlipped] = useState(isFlipped);
    return(
        <div 
            className="h-28 w-1/3 cursor-pointer"
            onClick={() => setIsFlipped(!isFlippedState)}
            style={{ perspective: "1000px" }}
        >
            <div
                className="relative w-full h-full transition-transform duration-500 rounded-lg"
                style={{
                    transformStyle: "preserve-3d",
                    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"
                }}
            >
                {/* Lado da frente */}
                <div
                    className="absolute w-full h-full bg-red-500 rounded-lg flex items-center justify-center"
                    style={{ backfaceVisibility: "hidden" }}
                >
                    <CircleQuestionMark className="size-8 text-zinc-100"/>
                </div>

                {/* Lado de trás */}
                <div
                    className="absolute w-full h-full bg-zinc-200 rounded-lg flex items-center justify-center"
                    style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)"
                    }}
                >
                    <span className="text-4xl">{emoji}</span>
                </div>
            </div>
        </div>
    )
    
}