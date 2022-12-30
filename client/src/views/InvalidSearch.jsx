export default function InvalidSearch() {
    return (
        <div className="flex flex-col col-span-full w-full h-[400px] pt-8 md:pt-12 gap-4 items-center text-center text-white">
            <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl">There are no games related to your search.</h1>
            <p className="text-lg md:text-xl lg:text-2xl">Try again using another words to look for the game you want.</p>
        </div>
    )
}