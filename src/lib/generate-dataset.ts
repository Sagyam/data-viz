import {Dataset} from "@/entities/dataset.entities";
import {getRandomColorArray} from "@/lib/random-color";
const getRand = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const getRandDate = (): string => {
    const year = getRand(2010, 2020);
    const month = getRand(1, 12);
    const day = getRand(1, 28);
    return `${year}-${month}-${day}`;
}

const getRandLabels = (count: number): string[] => {
    const labels = [];
    for (let i = 0; i < count; i++) {
        labels.push(`Label ${i}`);
    }
    return labels;
}

const getRandData = (count: number): number[] => {
    const data = [];
    for (let i = 0; i < count; i++) {
        data.push(getRand(1, 100));
    }
    return data;
}

export const getRandomDataset = (count=5): Dataset => {
    return {
        id: getRand(1000, 9000).toString(),
        name: `Dataset ${getRand(1, 100)}`,
        labels: getRandLabels(count),
        data: getRandData(count),
        backgroundColors: getRandomColorArray(0.3, count),
        borderColors: getRandomColorArray(1, count),
        count: count,
        createdAt: getRandDate(),
        updatedAt: getRandDate(),
    };
};