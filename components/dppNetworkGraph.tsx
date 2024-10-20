import React, { useEffect, useState } from "react";
import Graph from "react-graph-vis";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { v4 as uuidv4 } from "uuid";

const initialGraph = {
  nodes: [],
  edges: [],
};

const ProductMovementNetwork: React.FC<any> = ({ selectedProduct }: any) => {
  const [graph, setGraph] = useState<any>(initialGraph);

  useEffect(() => {
    if (selectedProduct?.dpp_trace) {
      const dpp_trace = selectedProduct.dpp_trace;
      const suppliers = dpp_trace.split("-");
      const graphData = {
        nodes: suppliers.map((id: string, index: number) => ({
          id: index,
          label: id,
          color: "#D3D3D3",
        })),
        edges: suppliers
          .map((id: string, index: number) => {
            if (index < suppliers.length - 1) {
              return {
                from: index,
                to: index + 1,
                arrows: "to",
              };
            }
            return null;
          })
          .filter((edge: any) => edge !== null),
      };
      setGraph(graphData);
    }
  }, [selectedProduct]);

  const options = {
    layout: { hierarchical: false },
    edges: { color: "#999999", width: 1, smooth: { type: "continuous" } },
    nodes: {
      shape: "box",
      font: { size: 12, color: "#333333" },
      borderWidth: 1,
    },
    physics: { enabled: false },
    height: "400px",
    interaction: { dragNodes: false, dragView: false, zoomView: false },
  };

  return (
    <Card className="rounded-xl">
      <CardHeader>
        <CardTitle>Product Movement Network</CardTitle>
      </CardHeader>
      <CardContent>
        {graph?.nodes?.length ? (
          <Graph graph={graph} options={options} />
        ) : (
          <p>Loading graph data...</p>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductMovementNetwork;