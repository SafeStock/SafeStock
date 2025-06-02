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
        <div className="flex items-center gap-3 relative left-[18vh]">
            <span className={`inline-block rounded-full w-[2vh] h-[2vh] mr-[1vh]`} style={{ backgroundColor: corStatus(status) }}></span>
            <span>{status}</span>
        </div>
    );
}
