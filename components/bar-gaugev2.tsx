"use client";

import { CompanyData } from "@/providers/CompanyProvider";

interface BarGaugeProps {
  companyData: CompanyData | null | undefined;
}

export default function BarGauge({ companyData = null }: BarGaugeProps) {
  const width = 60;
  const height = 350;
  const markerWidth = 5;

  const esg_rating = (companyData?.esg_rating ?? 0) * 10;
  const market_average = (companyData?.market_average ?? 0) * 10;
  const regulation_target = (companyData?.regulation_target ?? 0) * 10;
  const best_performer = (companyData?.best_performer ?? 0) * 10;

  const getMarkerPosition = (value: number) => {
    const minValue = 0;
    const maxValue = 100;
    const adjustedValue = (value - minValue) / (maxValue - minValue);
    return (1 - adjustedValue) * height;
  };

  const esgRatingPos = getMarkerPosition(esg_rating);
  const marketAveragePos = getMarkerPosition(market_average);
  const regulationTargetPos = getMarkerPosition(regulation_target);
  const bestPerformerTargetPos = getMarkerPosition(best_performer);

  return (
    <div className="flex flex-col items-center justify-center max-w-6xl mx-auto">
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e74c3c" />
            <stop offset="50%" stopColor="#f1c40f" />
            <stop offset="100%" stopColor="#2ecc71" />
          </linearGradient>
        </defs>
        <rect x={0} y={0} width={width} height={height} fill="url(#barGradient)" rx={10} ry={10}/>

        {/* Company Rating Marker */}
        <polygon
          points={`0,${esgRatingPos} ${-markerWidth},${esgRatingPos - 2.5} ${-markerWidth},${esgRatingPos + 2.5}`}
          fill="black"
        />
        <text
          x={-markerWidth - 10}
          y={esgRatingPos}
          textAnchor="end"
          alignmentBaseline="middle"
          className="text-sm font-medium"
          fill="black"
        >
          Company Rating: {esg_rating}
        </text>

        {/* Industry Benchmark Marker */}
        <polygon
          points={`${width},${marketAveragePos} ${width + markerWidth},${marketAveragePos - 2.5} ${width + markerWidth},${marketAveragePos + 2.5}`}
          fill="black"
        />
        <text
          x={width + markerWidth + 10}
          y={marketAveragePos}
          textAnchor="start"
          alignmentBaseline="middle"
          className="text-sm font-medium"
          fill="black"
        >
          Industry Benchmark: {market_average}
        </text>

        {/* Regulation Target Marker */}
        <polygon
          points={`${width},${regulationTargetPos} ${width + markerWidth},${regulationTargetPos - 2.5} ${width + markerWidth},${regulationTargetPos + 2.5}`}
          fill="black"
        />
        <text
          x={width + markerWidth + 10}
          y={regulationTargetPos}
          textAnchor="start"
          alignmentBaseline="middle"
          className="text-sm font-medium"
          fill="black"
        >
          Target: {regulation_target}
        </text>

        {/* Best Performer Marker */}
        <polygon
          points={`${width},${bestPerformerTargetPos} ${width + markerWidth},${bestPerformerTargetPos - 2.5} ${width + markerWidth},${bestPerformerTargetPos + 2.5}`}
          fill="black"
        />
        <text
          x={width + markerWidth + 10}
          y={bestPerformerTargetPos}
          textAnchor="start"
          alignmentBaseline="middle"
          className="text-sm font-medium"
          fill="black"
        >
          Best Performer: {best_performer}
        </text>

        {/* Axis Labels */}
        {["100", "0"].map((label, index) => {
          const y = index === 0 ? 0 : height;
          return (
            <text
              key={index}
              x={-20}
              y={y}
              textAnchor="end"
              alignmentBaseline="middle"
              className="text-xs font-medium"
            >
              {label}
            </text>
          );
        })}
      </svg>

      <div className="text-center mt-2">
        <p className="text-lg font-bold">Emission Intensity Benchmarks</p>
        <p className="text-sm">(in kgCO<sub>2</sub>e/kg)</p>
      </div>
    </div>
  );
}
