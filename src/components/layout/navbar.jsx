import { useContext } from "react"
import { Link } from "react-router-dom"
import { DarkLightContext } from "../../context"

export default function Navbar(){
    const { theme, toggleTheme } = useContext(DarkLightContext)
    const handleToggleTheme = () => {
        toggleTheme()
    }

    return(
        <div className={theme ? "w-screen z-10 bg-gray-800 top-0" : "w-screen z-10 bg-blue-800 top-0"}>
            <div className="flex justify-between place-items-center py-1 px-4 md:flex md:justify-between md:px-6 md:py-4 md:place-items-center">
                <h1 className="text-3xl md:text-2xl font-bold mr-4 text-white font-poppins"><Link to={'/'}>RandomUser</Link></h1>
                <div className="flex flex-row place-items-center space-x-10">
                    <div onClick={() => handleToggleTheme()}>
                        <div className={theme ? 'flex w-20 h-10 bg-gray-600 m-2 rounded-full transition-all duration-500' :'flex w-20 h-10 bg-blue-600 m-2 rounded-full transition-all duration-500'}>
                            <span className={theme ? 'h-10 w-10 bg-white rounded-full ml-10 transition-all duration-500': 'h-10 w-10 bg-white rounded-full transition-all duration-500'}></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}