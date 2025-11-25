"use server"

import { getBankMaterials } from "@/lib/materials";
import { PrismaClient } from "@/prisma/prisma/generated/client";
import Image from "next/image";

export default async function Home() {

  const prisma = new PrismaClient();
  const accounts = await prisma.account.findMany();
  const characters = await prisma.character.findMany({
    include: { race: true }
  });


  return (
    <div className="grid grid-cols-2 gap-3">

      <div>Wybierz postać</div>

      {accounts.map(a => {
        return (
          <div key={a.id}>
            {a.gw2_id}
          </div>
        )
      })}


      {characters.map(c => {
        return (
          <div key={c.id}>
            {c.name}
          </div>
        )
      })}


    </div>
  );
}
