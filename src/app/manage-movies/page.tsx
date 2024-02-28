import {useState} from "react"
export default function Manage() {
    const [index, setIndex] = useState(0)
    const movies = {
        
    }
    return (
        <div className="flex flex-col bg-black h-screen items-center justify-center ">
            <div className="flex flex-col h-5/6 w-10/12 bg-dark-jade items-center space-y-10 rounded-lg">
                <input type="text" placeholder="Search Movie to Edit" className="rounded mt-5 w-4/12 h-8 bg-white placeholder:italic placeholder:text-slate-400" />
                <h1 className="self-start text-white font-sans font-semibold ml-6 text-xl">Movies Currently Showing and Coming Soon</h1>
                <div className="flex flex-row w-10/12 h-3/5 bg-teal-950 rounded">
                    <button>Previous</button>

                    <button>Nexts</button>
                </div>
            </div>
        </div>
    )
}