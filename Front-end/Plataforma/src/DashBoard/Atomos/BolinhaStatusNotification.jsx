export function StatusBadge({ status }) {
    const corStatus = (status) => {
        switch (status.toLowerCase()) {
            case "crítico":
                return "#ff3b30"; // vermelho
            case "atenção":
                return "#ff9500"; // laranja
        }
    };

    return (
        <div className="flex items-center items-center gap-1 text-[3vh] relative left-[0.3vh]">
            <span className={`rounded-full w-[3vh] h-[3vh] mr-[0.4vh]`} style={{ backgroundColor: corStatus(status)}}></span>
            <span style={{color: corStatus(status)}}>{status}</span>
        </div>
    );
}
