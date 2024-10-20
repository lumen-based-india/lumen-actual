import React, { useEffect, useState } from "react";
import Graph from "react-graph-vis";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getProductById } from "@/utils/databaseQueries/products";

const initialGraph = {
  nodes: [],
  edges: [],
};

// Function to generate random bright colors
const getRandomBrightColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  // Ensure the color is bright by manipulating the R, G, B channels
  const rgb = parseInt(color.slice(1), 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = rgb & 0xff;
  
  // If the color is too dark, lighten it
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  if (brightness < 128) {
    return getRandomBrightColor(); // Recursively try again for a bright color
  }
  return color;
};

const ProductMovementNetwork: React.FC<any> = ({ selectedProduct }: any) => {
  const [graph, setGraph] = useState<any>(initialGraph);
  const [labels, setLabels] = useState<string[]>([]);

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
            const productLabels = response.map((product: any) => product.product_name);
            setLabels(productLabels);
            console.log({ productLabels });

            const graphData = {
              nodes: suppliers.map((id: string, index: number) => ({
                id: index,
                label: productLabels[index] ?? id,
                color: getRandomBrightColor(), // Assign random bright color
                fontSize: "34px",
              })),
              edges: [
                ...suppliers.map((id: string, index: number) => {
                  if (index < suppliers.length - 1) {
                    return {
                      from: index,
                      to: index + 1,
                      arrows: "to",
                    };
                  }
                  return null;
                }).filter((edge: any) => edge !== null),
                {
                  from: suppliers.length - 1, // Connect last node
                  to: 0, // Connect back to the first node
                  arrows: "to",
                },
              ],
            };
            setGraph(graphData);
          })
          .catch((error) => {
            console.error("Error fetching product data:", error);
          });
      } else {
        const graphData = {
          nodes: suppliers.map((id: string, index: number) => ({
            id: index,
            label: labels[index] ?? id,
            color: getRandomBrightColor(), // Assign random bright color
          })),
          edges: [
            ...suppliers.map((id: string, index: number) => {
              if (index < suppliers.length - 1) {
                return {
                  from: index,
                  to: index + 1,
                  arrows: "to",
                };
              }
              return null;
            }).filter((edge: any) => edge !== null),
            {
              from: suppliers.length - 1, // Connect last node
              to: 0, // Connect back to the first node
              arrows: "to",
            },
          ],
        };
        setGraph(graphData);
      }
    }
  }, [selectedProduct, labels]);

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