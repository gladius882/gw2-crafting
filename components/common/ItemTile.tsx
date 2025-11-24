import Image from "next/image"

type Props = {
    item_id: number,
    name: string,
    count?: number,
    icon: string
}

export default function ItemTile (props: Props) {
    return (
        <div className="shadow-white shadow text-center flex flex-col items-center justify-center p-1">
            <Image src={props.icon} alt={props.name} width={70} height={70} className="border border-gray" />
            <div>{props.name}</div>
            {props.count && (
                <div>{props.count}</div>
            )}
        </div>
    )
}