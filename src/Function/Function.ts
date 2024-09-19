export const formatDate = (dateString: string) => {
    const options = {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    };
    const date = new Date(dateString);
    return date.toLocaleString('fr-FR', options);
};

export const dateTimeFormat = (dateString : string) => {
    return dateString.replace('T', ' ');
}

export const dateLitteralToDateTime = (date: { getDate: () => any; getMonth: () => number; getFullYear: () => any; getHours: () => any; getMinutes: () => any; }) => {
    const day = String(date.getDate()).padStart(2, '0'); // Jour
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Mois (0-11 donc +1)
    const year = date.getFullYear(); // Année
    const hours = String(date.getHours()).padStart(2, '0'); // Heures
    const minutes = String(date.getMinutes()).padStart(2, '0'); // Minutes

    return `${year}-${month}-${day}T${hours}:${minutes}`; // Format YYYY-MM-DDTHH:mm
};