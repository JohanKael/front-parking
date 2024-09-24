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

// Convertir la date time du front en datetime pour le back
export const dateTimeFormat = (dateString : string) => {
    return dateString.replace('T', ' ');
}

// Convertir la date littéral en datetime
export const dateLitteralToDateTime = (date: { getDate: () => any; getMonth: () => number; getFullYear: () => any; getHours: () => any; getMinutes: () => any; }) => {
    const day = String(date.getDate()).padStart(2, '0'); // Jour
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Mois (0-11 donc +1)
    const year = date.getFullYear(); // Année
    const hours = String(date.getHours()).padStart(2, '0'); // Heures
    const minutes = String(date.getMinutes()).padStart(2, '0'); // Minutes

    return `${year}-${month}-${day}T${hours}:${minutes}`; // Format YYYY-MM-DDTHH:mm
};

// Convertir la date littéral en datetime
export const dateLitteralToDate = (date: { getDate: () => any; getMonth: () => number; getFullYear: () => any; getHours: () => any; getMinutes: () => any; }) => {
    const day = String(date.getDate()).padStart(2, '0'); // Jour
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Mois (0-11 donc +1)
    const year = date.getFullYear(); // Année
    return `${year}-${month}-${day}`; // Format YYYY-MM-DDTHH:mm
};

// Fonction qui formate les nombres pour que cela soit plus lisible
export const formatNumber = (num : number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

// Fonction qui prend un nombre et le convertit en mois littéral
export const getMonthName = (monthNumber : number) => {
    const months = [
        "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
        "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
    ];
    
    // Vérifie si le numéro du mois est valide (1-12)
    if (monthNumber < 1 || monthNumber > 12) {
        return "Mois invalide";
    }
    
    return months[monthNumber - 1]; // -1 car les indices du tableau commencent à 0
};