import "dotenv/config"
import { PrismaClient } from "../prisma/generated/client";
import { getAccount } from "@/lib/account";

const prisma = new PrismaClient();

async function main() {

    const account = await getAccount();

    const result = await prisma.account.upsert({
        where: { gw2_id: account.id },
        update: {
            age: account.age,
            world: account.world,
            daily_ap: account.daily_ap,
            monthly_ap: account.monthly_ap,
            fractal_level: account.fractal_level,
            wvw_rank: account.wvw_rank
        },
        create: {
            gw2_id: account.id,
            age: account.age,
            daily_ap: account.daily_ap,
            fractal_level: account.fractal_level,
            monthly_ap: account.monthly_ap,
            world: account.world,
            wvw_rank: account.wvw_rank
        }
    })

    console.log(result);
}

main()
    .then(() => console.log('success'))
    .catch((err) => console.log(err))
    .finally(() => {
        prisma.$disconnect();
    })