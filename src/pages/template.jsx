import { Navbar } from "../components"

export default function Template({ children }){
    return(
        <>
            <Navbar/>
            <div className="bg-white overflow-x-auto">
                <div className="h-screen">
                    {children}
                </div>
            </div>
        </>
    )
}