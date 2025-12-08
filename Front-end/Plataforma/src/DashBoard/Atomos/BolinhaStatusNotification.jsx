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
        <div className="flex items-center items-center gap-1 text-[2.5vh] relative">
            <span className={`rounded-full w-[3.4vh] h-[3.4vh]`} style={{ backgroundColor: corStatus(status)}}></span>
        </div>
    );
}
