import { MutatingDots } from "react-loader-spinner";

export default function Loader() {
    return (
        <div className="flex flex-col col-span-full w-full min-h-screen pt-24 md:pt-40 gap-4 items-center bg-slate-900">
            <MutatingDots
                height="120"
                width="120"
                color="#be123c"
                secondaryColor='#475569'
                radius='16'
                ariaLabel="mutating-dots-loading"
                visible={true}
            />
        </div>
    )
}
