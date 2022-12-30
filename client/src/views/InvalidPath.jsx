import { Link } from "react-router-dom";

export default function InvalidPath() {
    return (
        <div className="flex flex-col h-screen w-full items-center text-white bg-slate-900">
            <div className="flex flex-col h-full pt-8 md:pt-12 gap-4 mt-[200px] text-center">
                <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl">{`Oops! This route doesn't exist :/`}</h1>
                <p className="text-lg md:text-xl lg:text-2xl">{`Don't worry, click the button below to go back!`}</p>
                <Link to="/">
                    <button className="primaryButton">HOME PAGE</button>
                </Link>
            </div>
        </div>
    )
}