export default function NoGamesCreated() {
    return (
        <div className="flex flex-col col-span-full w-full h-[400px] pt-8 md:pt-12 gap-4 items-center text-center text-white">
            <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl">There are no games created yet.</h1>
            <p className="text-lg md:text-xl lg:text-2xl">{`Why don't you begin to create some and fill this site with them?`}</p>
            <p className="text-sm md:text-base uppercase">Press the <strong>button</strong> in the navigation bar and start!</p>
        </div>
    )
}