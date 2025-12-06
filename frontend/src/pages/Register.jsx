import React from "react";

export const Register = () => {
    return (
        <div className="h-screen w-full overflow-hidden">
            <div className="h-48 w-full flex justify-center">
                <div className="w-1/3 text-center justify-center content-center flex-col items-center">
                    <h1 className="text-5xl font-bold text-[#F26611]">AyurSutra</h1>
                    <span className="mt-4">
                        <h1 className="text-xl text-[#8B8B8B]">Professional Panchakarma Management Platform</h1>
                    </span>
                </div>
            </div>

            <div className="min-h-screen flex justify-center w-full">
                <div className="h-132  bg-[rgba(20,20,20,0.55)] backdrop-blur-2xl border border-[rgba(255,255,255,0.08)]
  shadow-[0_8px_32px_rgba(0,0,0,0.4)] w-1/3 rounded-2xl">

                    <div className="w-full h-24 bg-green-400 flex-col text-center content-center">
                        <span className="text-2xl font-medium"><h1>Welcome Back</h1></span>
                        <span><h1>Access your secure healthcare portal</h1></span>
                    </div>

                    <div className="h-8 w-full flex justify-center bg-orange-400">
                        <div className="w-3/4 bg-green-400 rounded-lg">
                            <button className="w-1/2 h-8 border-white">Sign In</button>
                            <button className="w-1/2 h-8 border-white">Register</button>
                        </div>
                    </div>

                   
                   <div className="h-24 w-full">
                        <input className="h-12 w-3/4 border-grey-300" type="text" name="" id="" placeholder="Enter Email"/>
                   </div>


                </div>
            </div>


        </div>
    );
};