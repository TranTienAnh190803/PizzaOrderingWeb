class Converter {
    static toVND(num) {
        return num.toLocaleString("vi-VN");
    }

    static getDate(selectedDate) {
        const date = new Date(selectedDate);

        const yyyy = date.getFullYear();
        const MM = String(date.getMonth() + 1).padStart(2, "0");
        const dd = String(date.getDate()).padStart(2, "0");

        return `${dd}/${MM}/${yyyy}`;
    }

    static getTime(selectedDate) {
        const date = new Date(selectedDate);

        const hh = String(date.getHours()).padStart(2, "0");
        const mm = String(date.getMinutes()).padStart(2, "0");

        return `${hh}:${mm}`;
    }
}

export default Converter;