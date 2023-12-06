import { Card, DonutChart, Title } from "@tremor/react";
import React from "react";

const cities = [
    {
        name: "New York",
        sales: 9800,
    },
    {
        name: "London",
        sales: 4567,
    },
    {
        name: "Hong Kong",
        sales: 3908,
    },
    {
        name: "San Francisco",
        sales: 2400,
    },
    {
        name: "Singapore",
        sales: 1908,
    },
    {
        name: "Zurich",
        sales: 1398,
    },
];

const valueFormatter = (number: number) => `$ ${new Intl.NumberFormat("us").format(number).toString()}`;

export const MyDonutChart = () => {
    const [value, setValue] = React.useState(null);
    return (
        <>
            <Card className="max-w-4xl mx-auto p-6">
                <Title>Sales</Title>
                <DonutChart
                    className="mt-6"
                    data={cities}
                    category="sales"
                    index="name"
                    colors={["rose", "yellow", "orange", "indigo", "blue", "emerald"]}
                    onValueChange={(v) => setValue(v)}
                />
            </Card>
            <pre>{JSON.stringify(value)}</pre>
        </>
    );
};