import { TargetElement, ValidityStateKey, ValiteReturnValue } from "./type"

const validityStateKeys: Readonly<ValidityStateKey[]> = [
    "badInput",
    "customError",
    "patternMismatch",
    "rangeOverflow",
    "rangeUnderflow",
    "stepMismatch",
    "tooLong",
    "tooShort",
    "typeMismatch",
    "valid",
    "valueMissing",
] as const

const getState = (v: ValidityState) => {
    return validityStateKeys.find((vk) => v[vk] === true)
}

export const simpleValidate = (element: TargetElement): ValiteReturnValue => {
    const { validity, validationMessage } = element
    const state = getState(validity)
    return {
        valid: validity.valid,
        message: validationMessage,
        type: state,
    }
}
