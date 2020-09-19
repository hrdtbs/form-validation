import { ValidityStateKey, ValiteReturnValue } from "./type"

export type ValidationMessages = {
    [key in ValidityStateKey]?: string
}

export const replaceValidationMessage = (
    value: ValiteReturnValue,
    validationMessages?: ValidationMessages
) => {
    if (!validationMessages || !value.type) return value
    const message = validationMessages[value.type]
    if (!message) return value
    return {
        ...value,
        message,
    }
}
