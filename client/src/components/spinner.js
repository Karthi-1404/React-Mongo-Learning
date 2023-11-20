import React from "react"

function Spinner(){

    return(
        <div
        className="fixed inset-0 bg-black z-[9999] items-center flex justify-center opacity-70"
        >
            <div
            className="w-10 h-10 border-4 border-solid border-gray-300 border-s-transparent rounded-full animate-spin"> 
            
          </div>
        </div>
    )
}

export default Spinner