import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import logo from "../img/finalLogo.svg";

export default function Footer() {
    return (
        <footer className="flex flex-row w-full h-40 p-8 justify-between gap-0 text-white bg-slate-800">
            <section className="flex flex-col gap-2">
                <div className="flex items-center">
                    <img className="h-4 mr-2" alt="Gameon Logo" src={logo} />
                    <span className="text-lg font-semibold">Gameon</span>
                </div>
                <div className="flex gap-2">
                    <h1 className="text-xs">See code</h1>
                    <a href="https://github.com/franodangelo/Videogames-Proyect" target="_blank" rel="noreferrer">
                        <FaGithub />
                    </a>
                </div>
            </section>
            <section className="flex flex-col">
                <div className="flex flex-col md:flex-row gap-1 md:items-center">
                    <h1>All rights reserved:</h1>
                    <h3 className="font-bold">Franco D'Angelo - 2022</h3>
                </div>
                <section className="flex mt-4 gap-2 md:self-end">
                    <a href="https://www.linkedin.com/in/franco-dangelo"
                        target="_blank"
                        rel="noreferrer">
                        <FaLinkedinIn />
                    </a>
                    <a href="https://github.com/franodangelo"
                        target="_blank"
                        rel="noreferrer">
                        <FaGithub />
                    </a>
                </section>
            </section>
        </footer>
    )
}
