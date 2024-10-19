import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Props = {};

const accordionData = [
  {
    value: "sourcing-harvesting",
    title: "Sourcing and Harvesting",
    content: [
      "Deforestation impact (Last 10 years) - Yes",
      "Cotton Quantity Sourced — 10 tons",
      "Date of sourcing — 4th May 2020",
      "Ethical sourcing and Producer Remuneration Rating — 3.5/5",
    ],
  },
  {
    value: "manufacturing",
    title: "Manufacturing",
    content: [
      "Energy Efficiency rating — 3.5/5",
      "Synthetic Chemicals Usage — Yes",
      "Sustainable Waste management — Yes",
      "Recycled/Upcycled material Usage — 2%",
    ],
  },
  {
    value: "transportation",
    title: "Transportation",
    content: ["Energy Efficiency rating — 3/5"],
  },
  {
    value: "retailing",
    title: "Retailing",
    content: [
      "Energy Efficiency rating — 2.5/5",
      "Sustainable packaging used - Yes",
    ],
  },
  {
    value: "recycling",
    title: "Recycling",
    content: [
      "Energy Efficiency rating — 4/5",
      "Recycled/Upcycled material Usage — 80%",
    ],
  },
];

const EsgTrace = (props: Props) => {
  return (
    <Card className="h-full rounded-xl">
      <CardHeader>
        <CardTitle>ESG Trace</CardTitle>
        <CardDescription>
          Track the environmental, social, and governance impact of the product
          journey
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="multiple">
          {accordionData.map((item) => (
            <AccordionItem key={item.value} value={item.value}>
              <AccordionTrigger>{item.title}</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-5">
                  {item.content.map((line, index) => (
                    <li key={index}>{line}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default EsgTrace;
