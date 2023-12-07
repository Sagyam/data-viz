import EChartsWrapper from '@/components/EChartWrapper'
import * as echarts from 'echarts'
import React from 'react'

export const BarChart: React.FC = () => {
  const chartOption: echarts.EChartsOption = {
    title: {
      text: 'Bar Chart',
      left: 'center',
    },
    dataset: {
      source: [
        ['score', 'amount', 'product'],
        [89.3, 58212, 'Matcha Latte'],
        [57.1, 78254, 'Milk Tea'],
        [74.4, 41032, 'Cheese Cocoa'],
        [50.1, 12755, 'Cheese Brownie'],
        [89.7, 20145, 'Matcha Cocoa'],
        [68.1, 79146, 'Tea'],
        [19.6, 91852, 'Orange Juice'],
        [10.6, 101852, 'Lemon Juice'],
        [32.7, 20112, 'Walnut Brownie'],
        [45.8, 35201, 'Vanilla Latte'],
        [78.2, 50432, 'Caramel Macchiato'],
        [64.5, 62031, 'Strawberry Smoothie'],
        [22.3, 41021, 'Peach Iced Tea'],
        [55.6, 75321, 'Blueberry Muffin'],
        [36.8, 98214, 'Hazelnut Coffee'],
        [82.7, 67123, 'Raspberry Lemonade'],
        [29.4, 53019, 'Chocolate Chip Cookie'],
        [67.9, 88102, 'Green Tea'],
        [14.2, 11234, 'Pineapple Slush'],
        [48.5, 46123, 'Almond Croissant'],
        [75.3, 37205, 'Mango Tango Smoothie'],
        [41.6, 57032, 'Cinnamon Roll'],
        [56.8, 81235, 'Pomegranate Iced Tea'],
        [33.7, 69210, 'Cherry Cheesecake'],
        [89.1, 42103, 'Espresso'],
        [17.4, 23015, 'Coconut Water'],
        [70.2, 83129, 'Black Forest Cake'],
        [53.9, 95128, 'Passion Fruit Sorbet'],
        [26.8, 74126, 'Butterscotch Latte'],
      ],
    },
    grid: { containLabel: true },
    xAxis: { name: 'amount' },
    yAxis: { type: 'category' },
    visualMap: {
      orient: 'horizontal',
      left: 'center',
      min: 10,
      max: 100,
      text: ['High Score', 'Low Score'],
      // Map the score column to color
      dimension: 0,
      inRange: {
        color: ['#65B581', '#FFCE34', '#FD665F'],
      },
    },
    series: [
      {
        type: 'bar',
        encode: {
          // Map the "amount" column to X axis.
          x: 'amount',
          // Map the "product" column to Y axis
          y: 'product',
        },
      },
    ],
  }

  return <EChartsWrapper option={chartOption} style={{ height: '600px' }} />
}
