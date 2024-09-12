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