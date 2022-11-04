import React from "react";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="flex flex-col md:flex-row w-full h-20 mt-auto px-8 justify-center gap-8 md:justify-between md:gap-0 items-center bg-slate-800">
            <section className="flex md:flex-col gap-8 md:gap-2">
                <div className="flex items-center">
                    <img className="mr-2 h-4" alt="Gameon Logo"
                    src="https://videogamesspa.vercel.app/static/media/finalLogo.a56c40d2.svg" />
                    <span className="self-center text-lg font-semibold">Gameon</span>
                </div>
                <div className="flex items-center gap-2">
                    <h1 className="text-sm">See code</h1>
                    <a href="https://github.com/franodangelo/Videogames-Proyect" target="_blank" rel="noreferrer">
                        <FaGithub />
                    </a>
                </div>
            </section>
            <section className="flex flex-col gap-2 font-bold items-center md:items-end">
                <h1 className="font-medium text-sm">Created by <strong>Franco D'Angelo</strong></h1>
                <section className="flex gap-2">
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
