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
    content: "Details about sourcing and harvesting processes."
  },
  {
    value: "manufacturing",
    title: "Manufacturing",
    content: "Information on manufacturing practices and standards."
  },
  {
    value: "transportation",
    title: "Transportation",
    content: "Insights into the transportation methods and their impact."
  },
  {
    value: "retailing",
    title: "Retailing",
    content: "Retailing strategies and their ESG implications."
  },
  {
    value: "recycling",
    title: "Recycling",
    content: "Recycling processes and sustainability measures."
  }
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
              <AccordionContent>{item.content}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default EsgTrace;
