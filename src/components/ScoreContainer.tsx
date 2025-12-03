import {Trophy, Target} from 'lucide-react'
import {Line} from 'rc-progress'

export default function ScoreContainer(){
    return(
        <div className="bg-zinc-100 w-full h-28 rounded-lg flex flex-col">
            <div className='flex justify-between '>
                <div className="flex items-center p-2">
                    <Trophy className="text-amber-400"/>
                    <div className="p-2">
                        <p className="text-gray-800 ">Pontuação </p>
                        <p className="text-gray-950 font-bold flex text-lg">0 </p>
                    </div>
                </div>
                <div className="flex items-center p-2">
                    <Target className="text-blue-600"/>
                    <div className="p-2">
                        <p className="text-gray-800 ">Progresso </p>
                        <p className="text-gray-950 font-bold flex text-lg">1/10 </p>
                    </div>
                </div>
            </div>
            <div className='w-full px-2'>
                <Line percent={10} strokeWidth={4} strokeColor="#6C63FF"    />
            </div>
        </div>
    )
}