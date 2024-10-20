import React, { useEffect, useMemo, useState } from "react";
import Graph from "react-graph-vis";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getProductById } from "@/utils/databaseQueries/products";

const initialGraph = {
  nodes: [],
  edges: [],
};

const ProductMovementNetwork: React.FC<any> = ({ selectedProduct }: any) => {
  const [graph, setGraph] = useState<any>(initialGraph);
  const [labels, setLabels] = useState<string[]>([]); // Use state for labels

  const getProductIdArrayData = async (suppliers: string[]) => {
    const data = await Promise.all(
      suppliers.map(async (id: string) => {
        const product = await getProductById(id);
        return product.data;
      }),
    );
    return data;
  };

  const productsData = async (suppliers: string[]) => {
    const data = await getProductIdArrayData(suppliers);
    console.log({ data });
    return data;
  };

  useEffect(() => {
    if (selectedProduct?.dpp_trace) {
      const dpp_trace = selectedProduct.dpp_trace;
      const suppliers = dpp_trace.split("-");
      if (labels.length === 0) {
        productsData(suppliers)
          .then((response) => {
            const productLabels = response.map((product: any) => product.product_name); // Map to get product names
            setLabels(productLabels); // Update labels state
            console.log({ productLabels }); // Log labels after they are set
            const graphData = {
              nodes: suppliers.map((id: string, index: number) => ({
                id: index,
                label: productLabels[index] ?? id,
                color: "#D3D3D3",
                fontSize: "34px",
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
            setGraph(graphData); // Update the graph state after labels are set
          })
          .catch((error) => {
            console.error("Error fetching product data:", error); // Handle any errors
          });
      } else {
        const graphData = {
          nodes: suppliers.map((id: string, index: number) => ({
            id: index,
            label: labels[index] ?? id,
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
    }
  }, [selectedProduct, labels]); // Add labels to dependency array

  const options = {
    layout: { hierarchical: false },
    edges: { color: "#999999", width: 1, smooth: { type: "continuous" } },
    nodes: {
      shape: "box",
      font: { size: 16, color: "#333333" },
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
          <Graph key={Date.now()} graph={graph} options={options} />
        ) : (
          <p>Loading graph data...</p>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductMovementNetwork;
