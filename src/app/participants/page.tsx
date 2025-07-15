"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import Body from "@/components/ui/body";
import Button from "@/components/ui/button";
import Header from "@/components/ui/header";
import {
  formatDateDayOfTheWeek,
  formatDateExtensive,
} from "@/utils/format-date";

export default function Participants() {
  const [data, setData] = useState<any>({});
  const router = useRouter();

  async function fetchParticipants() {
    const res: any = await fetch(`api/v1/participants`);
    const resultJson = await res.json();

    setData(resultJson);
  }

  useEffect(() => {
    fetchParticipants();
  }, []);

  return (
    <>
      <Header className="items-start bg-stone-200 border-2 border-stone-400" />

      <Body className="flex flex-col justify-start relative pb-8">
        <div className="flex flex-col gap-8 p-10 overflow-y-scroll">
          <h1 className="text-center text-2xl capitalize font-semibold text-stone-700">
            Participantes
          </h1>

          {!data.events && (
            <div className="flex flex-col h-screen items-center justify-center">
              <Loader className="animate-spin w-32 h-32 text-stone-400" />
            </div>
          )}

          {data.events &&
            Object.entries(data.events).map(([date, participants]: any) => (
              <div key={date}>
                <h3 className="font-medium pb-1 flex flex-row items-center">
                  <span className="capitalize flex flex-row item-center h-8 min-h-8 gap-2 mb-2">
                    <span className="flex flex-row  ml-2 w-8 h-8 min-w-8 min-h-8 justify-center items-center text-xl bg-stone-500 text-stone-100 p-1 rounded-full">
                      {participants.total_participants}
                    </span>
                    <span className="flex flex-col">
                      {/* {new Date(participants.date).toLocaleDateString("pt-BR")} */}
                      <span className="font-semibold text-sm">
                        {formatDateDayOfTheWeek(date)}
                      </span>
                      <span className="text-xs capitalize font-light -mt-1">
                        <small>{formatDateExtensive(date)}</small>
                      </span>
                    </span>
                  </span>
                </h3>

                {/* <pre className="text-xs p-10 ml-24">
                    {JSON.stringify(participants.participants, null, 2)}
                  </pre> */}

                <ul className="flex flex-col gap-3">
                  {participants?.participants.map((participant: any) => (
                    <li
                      key={participant.date_at}
                      className="flex items-center gap-2 bg-gray-200 p-2 rounded-md cursor-pointer"
                    >
                      <span className="flex flex-row gap-2 text-sm text-zinc-400 items-center">
                        <span className="relative flex flex-row -mt-1 w-8 h-8 min-w-8 min-h-8 justify-center items-center text-xl bg-stone-500 text-stone-100 p-1 rounded-full">
                          <Image
                            fill
                            unoptimized
                            alt="Foto participante"
                            src={participant.image_base64}
                            className="w-8 h-8 max-w-8 max-h-8 rounded-full overflow-hidden absolute"
                          />
                        </span>{" "}
                        <span className="flex flex-row items-center -mt-2">
                          <Link
                            target="_blank"
                            href={participant.image_url}
                            className="text-2xl font-bold hover:underline hover:decoration-1 hover:text-underline-offset-4 underline decoration-2 text-underline-offset-4"
                          >
                            <small className="text-xs text-gray-700 ">
                              click para acesse a foto do evento{" "}
                            </small>
                          </Link>
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
      </Body>
      <div className="flex w-full flex-row gap-4">
        <Button
          className="bg-stone-500 text-stone-100 "
          onClick={() => router.push("/")}
        >
          Inicio
        </Button>
      </div>
    </>
  );
}
