export function isPasswordValid(password: string): boolean {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&/()=?¡¿_.*-]).+$/.test(password);
}

export function isUserNameValid(name: string): boolean {
    return /^[a-zA-ZÀ-ÿ.\s]+$/.test(name);
}

export function isSupplierNameValid(name: string): boolean {
    return /^[a-zA-ZÀ-ÿ0-9-.()\s'"¨]+$/.test(name);
}

export function hasOnlyLetters(name: string): boolean {
    return /^[a-zA-ZÀ-ÿ\s]+$/.test(name);
}

export function hasOnlyTwoDecimals(number: number): boolean {
    return /^\d+(\.\d{1,2})?$/.test(number.toString());
}

export function isAddressLineNameValid(name: string): boolean {
    return /^[a-zA-ZÀ-ÿ0-9.\s'"¨]+$/.test(name);
}

export function isInvalidName(name: string): boolean {
    return /^[a-zA-ZÀ-ÿ0-9.,\s'"¨]{1,100}$/.test(name);
}

export function isInvalidDescription(description: string): boolean {
    return /^$|^[a-zA-ZÀ-ÿ0-9.,\s'"¨]{5,200}$/.test(description);
}

export function convertImageToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            if (typeof reader.result === 'string') {
                resolve(reader.result);
            } else {
                reject(new Error("Failed to convert image to Base64"));
            }
        };
        reader.onerror = (error) => reject(error);
    });
}
export function isValidImage(file: File) : boolean {
    return file.type.includes('image');
}

export function isValidSize(file: File): boolean {
    const MAX_FILE_SIZE = 5 * 1024 * 1024
    return file.size <= MAX_FILE_SIZE
}
export function formatDescription(description : string, limit: number): string {
    return description.length > limit ? description.substring(0, limit) + '...' : description;
}