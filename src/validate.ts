import { CustomValidations, setCustomErrors } from "./setCustomErrors"
import { TargetElement } from "./type"
import {
    ValidationMessages,
    replaceValidationMessage,
} from "./replaceValidationMessage"
import { simpleValidate } from "./simpleValidate"

export const validate = <T extends unknown>({
    element,
    value,
    customValidations,
    validationMessages,
}: {
    element?: TargetElement | null
    value?: T
    validationMessages?: ValidationMessages
    customValidations?: CustomValidations<T>
}) => {
    if (!element) return

    if (customValidations) {
        setCustomErrors(element, customValidations, value)
    }
    const result = simpleValidate(element)

    if (validationMessages) {
        return replaceValidationMessage(result, validationMessages)
    } else {
        return result
    }
}
