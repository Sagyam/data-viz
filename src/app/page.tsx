'use client';

import React, {useEffect} from 'react';
import { Title} from "@tremor/react";
import {getRandomDataset} from "@/lib/generate-dataset";
import {useDatasetStore} from "@/stores/data-store";
import {MyBarChart} from '@/components/MyBarChart';
import {MyAreaChart} from '@/components/MyAreaChart';
import {MyDonutChart} from "@/components/MyDonoughtChart";
import {MyLineChart} from "@/components/MyLineChart";

const HomePage: React.FC = () => {
    const { addDataset } = useDatasetStore();

    useEffect(() => {
        addDataset(getRandomDataset(20));
    }, []);

    return (
        <main className="max-w-4xl mx-auto p-6">
            <Title className="font-semibold text-4xl">Next.js Chart Example</Title>
            <MyBarChart />
            <MyLineChart />
            <MyAreaChart />
            <MyDonutChart />
        </main>
    );
};

export default HomePage;
