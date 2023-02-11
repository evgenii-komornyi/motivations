export const generateID = () => {
    let time = new Date().getTime();

    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
        /[xy]/g,
        char => {
            const random = (time + Math.random() * 16) % 16 | 0;
            time = Math.floor(time / 16);
            return (char === 'x' ? random : (random & 0x3) | 0x8).toString(16);
        }
    );

    return uuid;
};

const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

const getMonthName = monthNum => {
    return months[monthNum];
};

export const generateFileName = fileName => {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();

    return `${fileName}_${currentDate.getFullYear()}-${getMonthName(
        currentDate.getMonth()
    )}-${day < 10 ? `0${day}` : day}T${hours < 10 ? '0' + hours : hours}:${
        minutes < 10 ? '0' + minutes : minutes
    }_backup`;
};
