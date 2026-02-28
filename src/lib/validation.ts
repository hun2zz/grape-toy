// Korean phone number: 010-1234-5678, 01012345678, 010 1234 5678, etc.
const PHONE_REGEX = /^01[016789]-?\d{3,4}-?\d{4}$/;

export interface ValidationError {
    field: string;
    message: string;
}

export function validateLeadInput(data: {
    name?: string;
    phone?: string;
    message?: string;
    questions?: string;
}): ValidationError[] {
    const errors: ValidationError[] = [];

    // Name: required, 2-50 chars
    if (!data.name || data.name.trim().length < 2) {
        errors.push({ field: 'name', message: '이름은 2자 이상 입력해주세요.' });
    } else if (data.name.trim().length > 50) {
        errors.push({ field: 'name', message: '이름은 50자 이하로 입력해주세요.' });
    }

    // Phone: required, Korean format
    if (!data.phone) {
        errors.push({ field: 'phone', message: '연락처를 입력해주세요.' });
    } else {
        const cleaned = data.phone.replace(/\s/g, '');
        if (!PHONE_REGEX.test(cleaned)) {
            errors.push({ field: 'phone', message: '올바른 휴대폰 번호를 입력해주세요. (예: 010-1234-5678)' });
        }
    }

    // Message: max 1000 chars
    if (data.message && data.message.length > 1000) {
        errors.push({ field: 'message', message: '요청사항은 1000자 이하로 입력해주세요.' });
    }

    // Questions: max 1000 chars
    if (data.questions && data.questions.length > 1000) {
        errors.push({ field: 'questions', message: '궁금한 점은 1000자 이하로 입력해주세요.' });
    }

    return errors;
}
