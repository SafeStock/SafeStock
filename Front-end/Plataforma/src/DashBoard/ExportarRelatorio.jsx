import { AreaTittle } from "./Moleculas/AreaTittle";
import { AreaWorkExportar } from "./Celulas/AreaWorKExportar";
import { AnimacaoExport } from "./Moleculas/AnimacaoLoading";
import React, { useState, useEffect } from "react";

export function ExportarRelatorio() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
     <AnimacaoExport/>
    );
  }

  return (
    <div className="animate-fadeInContent">

        <AreaWorkExportar />

    </div>
  );
}
