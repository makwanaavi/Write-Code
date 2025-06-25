"use client"
import React from "react"
import Logo from '../../components/Logo'
import Textanimation from "../../components/Textanimation"

const Authlayout = ({ children }) => {
    return (
        <div className="grid lg:grid-cols-2 min-h-screen max-h-screen h-full">
            <div className="hidden lg:flex flex-col p-10 bg-primary/10">
                <div className="flex items-center ">
                    <Logo />
                </div>
                <div className="h-full flex flex-col justify-center text-2xl">
                    <Textanimation
                        className="flex-row mx-0 lg:gap-2 text-xl"
                    />
                </div>
            </div>

            <div className="h-full flex flex-col mt-14 lg:mt-0 lg:justify-center px-4 lg:p-6 overflow-auto">
                {children}
            </div>
        </div>
    )
}

export default Authlayout
