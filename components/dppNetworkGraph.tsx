import React from "react";
import Graph from "react-graph-vis";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ProductMovementNetwork: React.FC = () => {
  const graph = {
    nodes: [
      { id: 1, label: "Manufacturer", color: "#FFB3BA" },
      { id: 2, label: "Warehouse A", color: "#BAFFC9" },
      { id: 3, label: "Warehouse B", color: "#BAE1FF" },
      { id: 4, label: "Vendor 1", color: "#FFFFBA" },
      { id: 5, label: "Vendor 2", color: "#FFDFBA" },
      { id: 6, label: "Vendor 3", color: "#FFB3BA" },
      { id: 7, label: "Customer", color: "#E0BBE4" },
    ],
    edges: [
      { from: 1, to: 2, arrows: "to" },
      { from: 1, to: 3, arrows: "to" },
      { from: 2, to: 4, arrows: "to" },
      { from: 2, to: 5, arrows: "to" },
      { from: 3, to: 6, arrows: "to" },
      { from: 4, to: 7, arrows: "to" },
      { from: 5, to: 7, arrows: "to" },
      { from: 6, to: 7, arrows: "to" },
    ],
  };

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
        <Graph graph={graph} options={options} />
      </CardContent>
    </Card>
  );
};

export default ProductMovementNetwork;
