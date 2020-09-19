import { CustomValidations } from "./setCustomErrors"
import { TargetElement, ValiteReturnValue } from "./type"
import { ValidationMessages } from "./replaceValidationMessage"
import { useEffect, useRef, useState } from "react"
import { validate } from "./validate"

export const useValidation = <T extends unknown>({
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
    const [validity, setValidity] = useState<ValiteReturnValue>()

    const isInitialMount = useRef(true)
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false
            return
        }
        const validity = validate({
            element,
            customValidations,
            validationMessages,
            value,
        })
        setValidity(validity)
    }, [customValidations, element, validationMessages, value])

    return validity
}

export const useValidationUncontrolled = ({
    element,
    customValidations,
    validationMessages,
    trigger,
}: {
    element?: TargetElement | null
    trigger?: any
    validationMessages?: ValidationMessages
    customValidations?: CustomValidations<string>
}) => {
    const [validity, setValidity] = useState<ValiteReturnValue>()

    const isInitialMount = useRef(true)
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false
            return
        }
        const validity = validate({
            element,
            customValidations,
            validationMessages,
            value: element?.value,
        })
        setValidity(validity)
    }, [customValidations, element, validationMessages, trigger])

    return validity
}
