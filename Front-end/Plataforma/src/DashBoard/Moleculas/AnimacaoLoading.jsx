import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import { useEffect } from "react";


export function TimerLoading() {
    useEffect(() => {
        const timer = setTimeout(() => 1000);
        return () => clearTimeout(timer);
    }, []);
}
export function AnimacaoDash() {

    return (
        <div className="flex flex-col w-full items-center justify-start min-h-screen p-6 bg-gray-100 gap-6">
            <div className="flex w-full animate-fadeIn ">
                <div className="flex items-center fixed top-[4%] left-[8%] ">
                    <Skeleton borderRadius={6} width={550} height={75} />
                </div>

                <div className="fixed top-[14.5%] left-[7%] flex gap-[1vh] ">
                    <Skeleton borderRadius={6} width={195} height={155} />
                    <Skeleton borderRadius={6} width={195} height={155} />
                    <Skeleton borderRadius={6} width={195} height={155} />
                    <Skeleton borderRadius={6} width={195} height={155} />
                </div>

                <div className="fixed flex flex-col  top-[34%] left-[7%] gap-[1vh] ">
                    <Skeleton borderRadius={10} width={810} height={330} />
                    <Skeleton borderRadius={10} width={810} height={200} />
                </div>

                <div className="fixed flex flex-col top-[14.5%] right-[0.7%] gap-[2vh]">
                    <Skeleton borderRadius={10} width={600} height={710} />
                </div>
            </div>
        </div>
    );
}



export function AnimacaoPadrao({ displayButton, tela }) {
    return <div className="flex flex-col w-full items-center justify-center min-h-screen p-4 bg-gray-100 gap-4">
        <div className="flex w-full max-w-[900px] gap-2 animate-fadeIn">
            <div className="flex items-center fixed top-[4vh] left-[8.5vw]"  >
                <Skeleton borderRadius={6} width={300} height={75} />
            </div>

            <div className="flex items-center fixed top-[6vh] right-[6vw]" style={{ display: tela }}>
                <Skeleton circle width={50} height={50} />
            </div>

            <div className="fixed top-[15.5vh] left-[14vw] flex gap-[20vh]">
                <Skeleton borderRadius={6} width={135} height={65} />
                <Skeleton borderRadius={6} width={135} height={65} />
                <Skeleton borderRadius={6} width={175} height={65} />
                <Skeleton borderRadius={6} width={175} height={65} />
            </div>

            <div className="fixed flex flex-col top-[26vh] right-[1.3vw] gap-[1.2vh]">
                <Skeleton borderRadius={10} width={1410} height={90} />
                <Skeleton borderRadius={10} width={1410} height={90} />
                <Skeleton borderRadius={10} width={1410} height={90} />
                <Skeleton borderRadius={10} width={1410} height={90} />
                <Skeleton borderRadius={10} width={1410} height={90} />
            </div>

            <div className="flex items-center fixed bottom-[5vh] right-[44vw] " style={{ display: displayButton }}>
                <Skeleton circle width={65} height={65} />
            </div>
        </div>
    </div>
}

export function AnimacaoProduto(displayButton) {
    return (<div className="flex flex-col w-full items-center justify-center min-h-screen p-4 bg-gray-100 gap-4">
        <div className="flex w-full max-w-[900px] gap-2 animate-fadeIn">
            <div className="flex items-center fixed top-[4vh] left-[8.5vw]">
                <Skeleton borderRadius={6} width={220} height={75} />
            </div>

            <div className="flex items-center fixed top-[6vh] right-[6vw]">
                <Skeleton circle width={50} height={50} />
            </div>

            <div className="fixed top-[15.5vh] left-[14vw] flex gap-[7vh]">
                <Skeleton borderRadius={6} width={135} height={65} />
                <Skeleton borderRadius={6} width={135} height={65} />
                <Skeleton borderRadius={6} width={135} height={65} />
                <Skeleton borderRadius={6} width={135} height={65} />
                <Skeleton borderRadius={6} width={175} height={65} />
                <Skeleton borderRadius={6} width={175} height={65} />
            </div>

            <div className="fixed flex flex-col top-[26vh] right-[1.3vw] gap-[1.2vh]">
                <Skeleton borderRadius={10} width={1410} height={90} />
                <Skeleton borderRadius={10} width={1410} height={90} />
                <Skeleton borderRadius={10} width={1410} height={90} />
                <Skeleton borderRadius={10} width={1410} height={90} />
                <Skeleton borderRadius={10} width={1410} height={90} />
            </div>

            <div className="flex items-center fixed bottom-[5vh] right-[44vw]" style={{display: displayButton}}>
                <Skeleton circle width={65} height={65} />
            </div>
        </div>
    </div>)

}