import { TargetElement } from "./type"

export type CustomValidations<T extends unknown> = Array<
    (value?: T) => string | undefined | false
>

export const setCustomErrors = <T extends unknown>(
    element: TargetElement,
    customValidations: CustomValidations<T>,
    value?: T
) => {
    let cache: string | undefined | false = undefined
    customValidations.find((getError) => {
        cache = getError(value)
        return !!cache
    })
    element.setCustomValidity(cache || "")
}
