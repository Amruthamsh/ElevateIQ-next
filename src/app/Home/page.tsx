"use client";

import { useState } from 'react';
import Spline from '@splinetool/react-spline';
import Image from 'next/image';
import Link from 'next/link';
import infoCards from './libs/InfoCards';
import { ElementType, ReactElement } from 'react';
import { FiMoreVertical } from 'react-icons/fi'; // 3-dots icon

export default function Home() {
    return (
        <main className="w-full min-h-screen">
            <Navbar />
            <header id="home" className="flex flex-col md:flex-row w-full h-auto md:h-screen items-center justify-center p-4 sm:p-8 relative overflow-hidden">
                <div className="flex flex-col justify-center items-center gap-4 sm:gap-8 text-center md:w-2/3">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-3xl sm:text-5xl md:text-8xl font-black">ElevateIQ</h1>
                        <h2 className="text-sm sm:text-lg md:text-2xl">Reskilling Workforce</h2>
                    </div>
                    <p className="max-w-xs sm:max-w-md text-xs sm:text-base text-zinc-500">
                        ElevateIQ is a comprehensive platform that serves as a bridge between educational institutions and industry demands, facilitating seamless skill alignment and boosting employability among Indian youth.
                    </p>
                    <div className="flex items-center justify-center gap-2 sm:gap-4">
                        <a href="/aboutus" className="w-32 h-10 sm:w-48 sm:h-12 text-xs sm:text-base rounded bg-white text-black hover:bg-fuchsia-700 hover:text-white transition-colors flex items-center justify-center">
                            About Us
                        </a>
                    </div>
                </div>

                <div className="w-full h-60 md:w-1/3 md:h-full flex justify-center items-center relative">
                    <Image src="/h.png" layout="fill" className="object-contain" alt="Background Whirl" />
                </div>
            </header>

            <section id="about" className="h-auto min-h-screen w-full flex relative items-center justify-center p-4 sm:p-8">
                <div className="absolute -z-10 h-full w-full overflow-hidden">
                    <Image src="/whirl.svg" layout="fill" className="object-cover w-full overflow-visible sm:rotate-90" alt="Background Whirl" />
                </div>
                <div className="w-full h-full flex flex-col items-center justify-center gap-4 sm:gap-8 max-w-7xl">
                    <h3 className="text-2xl sm:text-4xl md:text-5xl font-bold text-center">Keeps you Updated on Tech World with these !!</h3>
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {infoCards.map((infoCard, index) => (
                            <InfoCard key={index} Icon={infoCard.icon} title={infoCard.title}>
                                <div className="flex flex-col items-center justify-center mb-4 p-4">
                                    <p className="text-xs sm:text-base text-center">{infoCard.bodyText}</p>
                                    <a href={infoCard.href} className="bg-fuchsia-700 rounded p-2 text-xs sm:text-sm transition-colors hover:bg-fuchsia-800 mt-2">{infoCard.buttonText}</a>
                                </div>
                            </InfoCard>
                        ))}
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    );
}

interface IInfoCardProps {
    title: string;
    Icon: ElementType;
    children: ReactElement<any, any>;
}

function InfoCard({ title, Icon, children }: IInfoCardProps) {
    return (
        <div className="w-full h-72 sm:h-80 flex flex-col justify-around items-center p-6 sm:p-8 bg-gray-900 rounded bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-20">
            <div className="p-4 bg-fuchsia-700 rounded-full">
                <Icon />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-center">{title}</h3>
            <div>{children}</div>
        </div>
    );
}

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="w-full h-16 sm:h-20 backdrop-filter backdrop-blur-xl bg-opacity-20 border-b flex items-center justify-center">
            <div className="max-w-7xl w-full flex items-center justify-between p-4">
                {/* Logo and Brand Name */}
                <div className="flex items-center">
                    {/* <Image src="/Image/logo.png" alt="Logo Alt Text" width={50} height={50} className="rounded-full" /> */}
                    <h6 className="font-bold ml-2 text-sm sm:text-lg">ElevateIQ</h6>
                </div>

                {/* Menu for larger screens */}
                <ul className="hidden sm:flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-base">
                    <li><Link className="text-fuchsia-500 hover:text-fuchsia-500 transition-colors" href="/Home">HOME</Link></li>
                    <li><Link className="hover:text-fuchsia-500 transition-colors" href="/Gameit">GAMEIT</Link></li>
                    <li><Link className="hover:text-fuchsia-500 transition-colors" href="/skillhive">SKILLHIVE</Link></li>
                    <li><Link className="hover:text-fuchsia-500 transition-colors" href="/ByteBriefs">BYTEBRIEFS</Link></li>
                    <li><Link className="hover:text-fuchsia-500 transition-colors" href="/Whappning">WHAPPNING</Link></li>
                    <li><Link className="hover:text-fuchsia-500 transition-colors" href="/Jobbit">JOBBIT</Link></li>
                    <li><Link className="hover:text-fuchsia-500 transition-colors" href="/Careercompus">CAREERCOMPUS</Link></li>
                </ul>

                {/* Hamburger icon for mobile view */}
                <div className="sm:hidden">
                    <FiMoreVertical 
                        className="text-2xl cursor-pointer"
                        onClick={toggleMenu}
                    />
                </div>

                {/* Mobile menu */}
                {isMenuOpen && (
                    <ul className="absolute top-16 right-4 bg-blue-950 rounded-lg shadow-lg p-4 flex flex-col gap-2 text-xs sm:text-base">
                        <li>
                            <Link href="/Home">
                                <button className="w-full text-fuchsia-500 hover:bg-fuchsia-700 hover:text-white rounded p-2 transition-colors">HOME</button>
                            </Link>
                        </li>
                        <li>
                            <Link href="/Gameit">
                                <button className="w-full hover:bg-fuchsia-700 hover:text-white rounded p-2 transition-colors">GAMEIT</button>
                            </Link>
                        </li>
                        <li>
                            <Link href="/Skillhive">
                                <button className="w-full hover:bg-fuchsia-700 hover:text-white rounded p-2 transition-colors">SKILLHIVE</button>
                            </Link>
                        </li>
                        <li>
                            <Link href="/ByteBriefs">
                                <button className="w-full hover:bg-fuchsia-700 hover:text-white rounded p-2 transition-colors">BYTEBRIEFS</button>
                            </Link>
                        </li>
                        <li>
                            <Link href="/Whappning">
                                <button className="w-full hover:bg-fuchsia-700 hover:text-white rounded p-2 transition-colors">WHAPPNING</button>
                            </Link>
                        </li>
                        <li>
                            <Link href="/Jobbit">
                                <button className="w-full hover:bg-fuchsia-700 hover:text-white rounded p-2 transition-colors">JOBBIT</button>
                            </Link>
                        </li>
                        <li>
                            <Link href="/Careercompus">
                                <button className="w-full hover:bg-fuchsia-700 hover:text-white rounded p-2 transition-colors">CAREERCOMPUS</button>
                            </Link>
                        </li>
                    </ul>
                )}
            </div>
        </div>
    );
}

function Footer() {
    return (
        <footer className="bg-black text-white py-4 text-center">
            <div className="max-w-7xl w-full flex flex-col sm:flex-row items-center justify-center sm:justify-between p-4">
                <div className="flex items-center mb-2 sm:mb-0">
                    {/* <Image src="/Image/logo.png" alt="Logo Alt Text" width={50} height={50} className="rounded-full" /> */}
                    <span className="ml-3 text-lg">ElevateIQ</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-400 sm:ml-4 text-center">
                    © {new Date().getFullYear()} ElevateIQ — 
                    <a href="https://twitter.com/knyttneve" className="text-gray-500 ml-1" target="_blank" rel="noopener noreferrer">@TEAM BOTS</a>
                </p>
                <Link href="/aboutus" className="flex items-center text-gray-400 hover:text-white">
                    <span className="text-xs sm:text-sm">About Us</span>
                </Link>
            </div>
        </footer>
    );
}

