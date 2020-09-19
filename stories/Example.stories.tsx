import React, { useEffect, useMemo, useRef, useState } from "react"
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {} from "../src/validate"
import { Meta } from "@storybook/react/types-6-0"
import {
    ValiteReturnValue,
    useValidation,
    useValidationUncontrolled,
    validate,
} from "../src"

export default {
    title: "Example",
} as Meta

const NoSubmitForm: React.FC = ({ children }) => (
    <form onSubmit={(e) => e.preventDefault()}>
        {children}
        <div>
            <button>submit</button>
        </div>
    </form>
)

export const ContollForm = () => {
    const [value, setValue] = useState("")
    const ref = useRef<HTMLInputElement>(null)
    const [validity, setValidity] = useState<ValiteReturnValue>()

    const isInitialMount = useRef(true)
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false
            return
        }
        if (ref.current) {
            const validity = validate({
                element: ref.current,
                customValidations: [
                    (value?: string) =>
                        value === "hrdtbs" && "this is my github account",
                ],
                validationMessages: {
                    valid: "it's ok",
                },
                value,
            })
            setValidity(validity)
        }
    }, [value])

    return (
        <NoSubmitForm>
            <input
                ref={ref}
                value={value}
                onChange={(event) => setValue(event.currentTarget.value)}
                required
            />
            {validity ? (
                <span style={{ color: validity.valid ? "gray" : "red" }}>
                    {validity.message}
                </span>
            ) : null}
        </NoSubmitForm>
    )
}

export const UncontollForm = () => {
    const [flag, setFlag] = useState(false)
    const ref = useRef<HTMLInputElement>(null)
    const [validity, setValidity] = useState<ValiteReturnValue>()

    const isInitialMount = useRef(true)
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false
            return
        }
        if (ref.current) {
            const validity = validate({
                element: ref.current,
                customValidations: [
                    (value?: string) =>
                        value === "hrdtbs" && "this is my github account",
                ],
                validationMessages: {
                    valid: "it's ok",
                },
                value: ref.current.value,
            })
            setValidity(validity)
        }
    }, [flag])

    return (
        <NoSubmitForm>
            <input ref={ref} onBlur={() => setFlag((p) => !p)} required />
            {validity ? (
                <span style={{ color: validity.valid ? "gray" : "red" }}>
                    {validity.message}
                </span>
            ) : null}
        </NoSubmitForm>
    )
}

export const UseValidationContollForm = () => {
    const [value, setValue] = useState("")
    const ref = useRef<HTMLInputElement>(null)

    const validity = useValidation({
        element: ref.current,
        customValidations: useMemo(
            () => [
                (value?: string) =>
                    value === "hrdtbs" && "this is my github account",
            ],
            []
        ),
        validationMessages: useMemo(
            () => ({
                valid: "it's ok",
            }),
            []
        ),
        value,
    })

    return (
        <NoSubmitForm>
            <input
                ref={ref}
                value={value}
                onChange={(event) => setValue(event.currentTarget.value)}
                required
            />
            {validity ? (
                <span style={{ color: validity.valid ? "gray" : "red" }}>
                    {validity.message}
                </span>
            ) : null}
        </NoSubmitForm>
    )
}

export const UseValidationUncontollForm = () => {
    const [flag, setFlag] = useState(false)
    const ref = useRef<HTMLInputElement>(null)
    const validity = useValidationUncontrolled({
        element: ref.current,
        customValidations: useMemo(
            () => [
                (value?: string) =>
                    value === "hrdtbs" && "this is my github account",
            ],
            []
        ),
        validationMessages: useMemo(
            () => ({
                valid: "it's ok",
            }),
            []
        ),
        trigger: flag,
    })

    return (
        <NoSubmitForm>
            <input ref={ref} onBlur={() => setFlag((p) => !p)} required />
            {validity ? (
                <span style={{ color: validity.valid ? "gray" : "red" }}>
                    {validity.message}
                </span>
            ) : null}
        </NoSubmitForm>
    )
}
