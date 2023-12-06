export const getRandomColor = (alpha: number) => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    const a = alpha;
    return `rgba(${r},${g},${b},${a})`;
}

export const getRandomColorArray = (alpha: number, length: number) => {
    const colors = [];
    for (let i = 0; i < length; i++) {
        colors.push(getRandomColor(alpha));
    }
    return colors;
}