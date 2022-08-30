import React from 'react';
import { FaLinkedinIn, FaGithub } from "react-icons/fa";

export default function Footer() {
    return (
        <div className='flex h-24 w-full px-8 justify-between items-center bg-palette-600 text-white'>
            <div className='flex flex-col gap-2 items-center'>
                <h1 className=''>See code:</h1>
                <a href="https://github.com/franodangelo/Videogames-Proyect"
                    target="_blank"
                    rel="noreferrer">
                    <FaGithub />
                </a>
            </div>
            <div className='flex flex-col gap-4 font-bold items-center'>
                <h1 className='font-light text-sm'>Created by Franco D'Angelo - 2022</h1>
                <section className='flex gap-8'>
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

        </div>
    )
}
