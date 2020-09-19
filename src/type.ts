export type ValiteReturnValue = {
    valid: boolean
    message?: string
    type?: ValidityStateKey
}

export type TargetElement = HTMLInputElement | HTMLTextAreaElement

export type ValidityStateKey = keyof ValidityState
