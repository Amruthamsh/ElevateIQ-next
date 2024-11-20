"use client";

import { useState } from "react";
import Spline from "@splinetool/react-spline";
import Image from "next/image";
import Link from "next/link";
import { ElementType, ReactElement } from "react";
import { FiMoreVertical } from "react-icons/fi"; // 3-dots icon
import Navbar from "@/components/Navbar";

export default function Page() {
  return (
    <main className="w-full min-h-screen">
      <Navbar />
      <header
        id="home"
        className="flex flex-col md:flex-row w-full h-auto md:h-screen items-center justify-center p-4 sm:p-8 relative overflow-hidden"
      >
        <div className="flex flex-col justify-center items-center gap-4 sm:gap-8 text-center md:w-2/3">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl sm:text-5xl md:text-8xl font-black">
              ElevateIQ
            </h1>
            <h2 className="text-sm sm:text-lg md:text-2xl">
              Reskilling Workforce
            </h2>
          </div>
          <p className="max-w-xs sm:max-w-md text-xs sm:text-base text-zinc-500">
            ElevateIQ is a comprehensive platform that serves as a bridge
            between educational institutions and industry demands, facilitating
            seamless skill alignment and boosting employability among Indian
            youth.
          </p>
          <div className="flex items-center justify-center gap-2 sm:gap-4">
            <a
              href="/aboutus"
              className="w-32 h-10 sm:w-48 sm:h-12 text-xs sm:text-base rounded bg-white text-black hover:bg-fuchsia-700 hover:text-white transition-colors flex items-center justify-center"
            >
              About Us
            </a>
          </div>
        </div>

        <div className="w-full h-60 md:w-1/3 md:h-full flex justify-center items-center relative">
          <Image
            src="/h.png"
            layout="fill"
            className="object-contain"
            alt="Background Whirl"
          />
        </div>
      </header>

      <section
        id="about"
        className="h-auto min-h-screen w-full flex relative items-center justify-center p-4 sm:p-8"
      >
        <div className="absolute -z-10 h-full w-full overflow-hidden">
          <Image
            src="/whirl.svg"
            layout="fill"
            className="object-cover w-full overflow-visible sm:rotate-90"
            alt="Background Whirl"
          />
        </div>
        <div className="w-full h-full flex flex-col items-center justify-center gap-4 sm:gap-8 max-w-7xl">
          <h3 className="text-2xl sm:text-4xl md:text-5xl font-bold text-center">
            Keeps you Updated on Tech World with these !!
          </h3>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {infoCards.map((infoCard, index) => (
              <InfoCard key={index} Icon={infoCard.icon} title={infoCard.title}>
                <div className="flex flex-col items-center justify-center mb-4 p-4">
                  <p className="text-xs sm:text-base text-center">
                    {infoCard.bodyText}
                  </p>
                  <a
                    href={infoCard.href}
                    className="bg-fuchsia-700 rounded p-2 text-xs sm:text-sm transition-colors hover:bg-fuchsia-800 mt-2"
                  >
                    {infoCard.buttonText}
                  </a>
                </div>
              </InfoCard>
            ))}
          </div>
        </div>
      </section>
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

import {
  AlarmClockOff,
  ArrowDownNarrowWide,
  ArrowUpNarrowWide,
  LucideIcon,
} from "lucide-react";

interface IInfoCard {
  title: string;
  bodyText: string;
  buttonText: string; // Add buttonText property
  icon: React.ElementType; // Assuming your icon type is a React element type
  id: number;
  href: string;
}

const infoCards: IInfoCard[] = [
  {
    title: "GameIt",
    bodyText:
      "Immerse yourself in the world of technology with GameIt! This page hosts an interactive QuizBot and an AI Chat Helper to challenge and enhance your tech knowledge.",
    buttonText: "Play Now", // Add buttonText
    icon: ArrowUpNarrowWide,
    id: 1,
    href: "../Gameit",
  },
  {
    title: "SkillHive",
    bodyText:
      "Showcase your tech prowess on Skillhive! Here, you can upload and display your tech projects, creating a portfolio that highlights your skills and accomplishments.",
    buttonText: "Explore", // Add buttonText
    icon: AlarmClockOff,
    id: 2,
    href: "../SkillHive/Login",
  },
  {
    title: "ByteBriefs",
    bodyText:
      "Stay informed in a flash with ByteBriefs! This page delivers tech news in short, concise forms, making it easy for you to stay updated on the latest happenings in the tech industry.",
    buttonText: "Read More", // Add buttonText
    icon: ArrowDownNarrowWide,
    id: 3,
    href: "../ByteBriefs",
  },
  {
    title: "ByteBriefs",
    bodyText:
      "Stay informed in a flash with ByteBriefs! This page delivers tech news in short, concise forms, making it easy for you to stay updated on the latest happenings in the tech industry.",
    buttonText: "Read More", // Add buttonText
    icon: ArrowDownNarrowWide,
    id: 3,
    href: "../ByteBriefs",
  },
  {
    title: "ByteBriefs",
    bodyText:
      "Stay informed in a flash with ByteBriefs! This page delivers tech news in short, concise forms, making it easy for you to stay updated on the latest happenings in the tech industry.",
    buttonText: "Read More", // Add buttonText
    icon: ArrowDownNarrowWide,
    id: 3,
    href: "../ByteBriefs",
  },
  {
    title: "ByteBriefs",
    bodyText:
      "Stay informed in a flash with ByteBriefs! This page delivers tech news in short, concise forms, making it easy for you to stay updated on the latest happenings in the tech industry.",
    buttonText: "Read More", // Add buttonText
    icon: ArrowDownNarrowWide,
    id: 3,
    href: "../ByteBriefs",
  },
];
