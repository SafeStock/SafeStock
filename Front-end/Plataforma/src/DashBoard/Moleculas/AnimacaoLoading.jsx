import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';



export function AnimacaoDash() {

    return (
        <div className="flex flex-col w-full items-center justify-start min-h-screen p-6 bg-gray-100 gap-6">
            <div className="flex w-full animate-fadeIn ">
                <div className="flex items-center fixed top-[4%] left-[8%] ">
                    <Skeleton borderRadius={6} width='48vh' height='8vh' />
                </div>

                <div className="fixed top-[14.5%] left-[7%] flex gap-[2vh] ">
                    <Skeleton borderRadius={6} width="12.5vw" height='17.5vh' />
                    <Skeleton borderRadius={6} width="12.5vw" height='17.5vh' />
                    <Skeleton borderRadius={6} width="12.5vw" height='17.5vh' />
                    <Skeleton borderRadius={6} width="12.5vw" height='17.5vh' />
                </div>

                <div className="fixed flex flex-col  top-[34%] left-[7%] gap-[2vh] ">
                    <Skeleton borderRadius={10} width='53vw' height='38vh' />
                    <Skeleton borderRadius={10} width='53vw' height='21vh' />
                </div>

                <div className="fixed flex flex-col top-[14.5%] right-[0.7%] gap-[2vh]">
                    <Skeleton borderRadius={10} width='38vw' height='81vh' />
                </div>
            </div>
        </div>
    );
}



export function AnimacaoPadrao({ displayButton }) {
    return <div className="flex flex-col w-full items-center justify-center min-h-screen p-4 bg-gray-100 gap-4">
        <div className="flex w-full max-w-[900px] gap-2 animate-fadeIn">
            <div className="flex items-center fixed top-[4vh] left-[8.5vw]"  >
                <Skeleton borderRadius={6} width='23vw' height='8vh' />
            </div>

            <div className="fixed top-[15.5vh] left-[15vw] flex gap-[14vw]">
                <Skeleton borderRadius={6} width='6.5vw' height='6vh' />
                <Skeleton borderRadius={6} width='8vw' height='6vh' />
                <Skeleton borderRadius={6} width='10vw' height='6vh' />
                <Skeleton borderRadius={6} width='10vw' height='6vh' />
            </div>

            <div className="fixed flex flex-col top-[23.5vh] right-[1.3vw] gap-[1.5vh]">
                <Skeleton borderRadius={10} width='91.5vw' height='10vh' />
                <Skeleton borderRadius={10} width='91.5vw' height='10vh' />
                <Skeleton borderRadius={10} width='91.5vw' height='10vh' />
                <Skeleton borderRadius={10} width='91.5vw' height='10vh' />
                <Skeleton borderRadius={10} width='91.5vw' height='10vh' />
            </div>

            <div className="flex items-center fixed bottom-[7vh] right-[44vw] " style={{ display: displayButton }}>
                <Skeleton circle width={65} height={65} />
            </div>
        </div>
    </div>
}

export function AnimacaoProduto(displayButton) {
    return (<div className="flex flex-col w-full items-center justify-center min-h-screen p-4 bg-gray-100 gap-4">
        <div className="flex w-full max-w-[900px] gap-2 animate-fadeIn">
            <div className="flex items-center fixed top-[4vh] left-[8.5vw]">
                <Skeleton borderRadius={6} width='13vw' height='8vh' />
            </div>

            <div className="fixed top-[15.5vh] left-[16vw] flex gap-[10vh]">
                <Skeleton borderRadius={6} width='6.5vw' height='6vh' />
                <Skeleton borderRadius={6} width='8vw' height='6vh' />
                <Skeleton borderRadius={6} width='9vw' height='6vh' />
                <Skeleton borderRadius={6} width='7vw' height='6vh' />
                <Skeleton borderRadius={6} width='11.5vw' height='6vh' />
                <Skeleton borderRadius={6} width='10vw' height='6vh' />
            </div>

            <div className="fixed flex flex-col top-[26vh] right-[1.3vw] gap-[1.2vh]">
                <Skeleton borderRadius={10} width='91.5vw' height='10vh' />
                <Skeleton borderRadius={10} width='91.5vw' height='10vh' />
                <Skeleton borderRadius={10} width='91.5vw' height='10vh' />
                <Skeleton borderRadius={10} width='91.5vw' height='10vh' />
                <Skeleton borderRadius={10} width='91.5vw' height='10vh' />
            </div>

            <div className="flex items-center fixed bottom-[5vh] right-[44vw]" style={{ display: displayButton }}>
                <Skeleton circle width={65} height={65} />
            </div>
        </div>
    </div>)

}

export function AnimacaoExport() {
    return (<div className="flex flex-col w-full items-center justify-center min-h-screen p-4 bg-gray-100 gap-4">
        <div className="flex w-full max-w-[900px] gap-2 animate-fadeIn">
            <div className="flex items-center fixed top-[4vh] left-[8.5vw]">
                <Skeleton borderRadius={6} width='24vw' height='8vh' />
            </div>

            <div className="flex items-center fixed top-[15vh] left-[43vw]">
                <Skeleton borderRadius={6} width='15vw' height='7vh' />
            </div>

            <div className="flex flex-row justify-center items-center h-[90vh] w-[100vw] ">

                <div className="flex items-center justify-start flex-col  gap-[8vh] relative top-[5vh] right-[20vw] ml-[6vw] mb-[10vh] ">
                    <Skeleton borderRadius={10} width='42vw' height='10vh' />
                    <Skeleton borderRadius={10} width='42vw' height='10vh' />
                </div>

                <div className="flex items-center justify-start flex-col  gap-[8vh] relative top-[5vh] right-[20vw] ml-[6vw] mb-[10vh]">
                    <Skeleton borderRadius={10} width='42vw' height='10vh' />
                    <Skeleton borderRadius={10} width='42vw' height='10vh' />

                </div>

            </div>

        </div>
    </div>)

}