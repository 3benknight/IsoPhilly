export function isSameCoords(x1, y1, coords) {
    let saved = coords.split(", ");
    x1 = x1.replace(/[\+\-]/g, '');
    y1 = y1.replace(/[\+\-]/g, '');
    coords = coords.replace(/[\+\-]/g, '');
    let x2 = saved[0];
    let y2 = saved[1];
    return Number.parseFloat(x1).toFixed(2) === Number.parseFloat(x2).toFixed(2) && 
        (-1 * Number.parseFloat(y1).toFixed(2)) === 1 * Number.parseFloat(y2).toFixed(2);
}