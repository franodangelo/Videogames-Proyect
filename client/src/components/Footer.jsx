import React from "react";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="flex w-full h-24 mt-auto px-8 justify-between items-center bg-slate-900">
            <div className="flex gap-1 items-center">
                <h1 className="text-sm uppercase">See code</h1>
                <a href="https://github.com/franodangelo/Videogames-Proyect"
                    target="_blank"
                    rel="noreferrer">
                    <FaGithub />
                </a>
            </div>
            <div className="flex flex-col gap-4 font-bold items-center">
                <h1 className="font-light text-sm">Created by Franco D'Angelo - 2022</h1>
                <section className="flex gap-8">
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
            </div>

        </footer>
    )
}
