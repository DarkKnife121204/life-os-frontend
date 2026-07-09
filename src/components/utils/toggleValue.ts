export function toggleValue(value: string, values: string[]) {
    if (values.includes(value)) {
        return values.filter((item) => item !== value);
    }

    return [...values, value];
}
