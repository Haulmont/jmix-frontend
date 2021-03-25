import { observable, makeObservable, action, computed } from 'mobx';

export const selectStepFieldErrors = (fieldErrors: Map<string, string[]>, fieldNames: string[]): Map<string, string[]> => {
    const stepFieldErrors = new Map<string, string[]>()
    fieldErrors.forEach((value: any, key: any) => {
        if(fieldNames.includes(key)) {
            stepFieldErrors.set(key, value)
        }
    })
    return stepFieldErrors
}

export interface FormStepConfig<Props> {
    name: string;
    fieldNames: string[];
    component: React.FC<Props>;
}

export class StepStore<Props> {
    FIELD_NAMES: string[];
    NAME: string;
    COMPONENT: React.FC<Props>;

    values: any = {};
    status: 'wait' | 'process' | 'finish' | 'error' = 'wait';
    serverFieldErrors: Map<string, string[]> = new Map<string, string[]>();
    serverGlobalErrors: string[] = [];

    constructor(config: FormStepConfig<Props>) {
        makeObservable(this, {
            values: observable,
            status: observable,
            serverFieldErrors: observable,
            serverGlobalErrors: observable,
            setValues: action,
            setStatus: action,
            setServerFieldErrors: action,
            setServerGlobalErrors: action,
        })
        this.FIELD_NAMES = config.fieldNames;
        this.NAME = config.name;
        this.COMPONENT = config.component;
    }

    setServerFieldErrors(serverFieldErrors: Map<string, string[]>) {
        this.serverFieldErrors = serverFieldErrors
    }

    setServerGlobalErrors(serverGlobalErrors: string[]) {
        this.serverGlobalErrors = serverGlobalErrors
    }

    setValues(values: any) {
        this.values = values
    }

    setStatus(status: 'wait' | 'process' | 'finish' | 'error') {
        this.status = status
    }
}

export class FormStepsStore<Props> {
    stepIndex = 0

    steps: Array<StepStore<Props>> = []

    constructor(stepsConfig: Array<FormStepConfig<Props>>) {
        makeObservable(this, {
            stepIndex: observable,
            steps: observable,
            isFirstStep: computed,
            isLastStep: computed,
            currentStep: computed,
            setSteps: action,
            next: action,
            prev: action,
            setStepIndex: action,
        })
        this.setSteps(stepsConfig)
    }

    get isFirstStep(): boolean {
        return this.stepIndex === 0
    }

    get isLastStep(): boolean {
        return this.stepIndex === this.steps.length - 1
    }

    get currentStep(): StepStore<Props> {
        return this.steps[this.stepIndex];
    }

    setSteps(stepsConfig: Array<FormStepConfig<Props>>) {
        this.steps = stepsConfig.map((config) => new StepStore(config))
    }

    next() {
        this.stepIndex += 1
    }
    prev() {
        this.stepIndex -= 1
    }

    setStepIndex(stepIndex: number) {
        this.stepIndex = stepIndex;
    }

    // Helpers
    getResult() {
        return this.steps.reduce<Record<string, any>>((acc, step) => {
            if (step.status !== 'finish') {
                throw new Error('One of a fialdStep isn\'t valid')
            }
            return {
                ...acc,
                ...step.values
            }
        }, {})
    }

    setFieldErrorsForSteps(fieldErrors: Map<string, string[]>) {
        this.steps.forEach(step => {
            step.setServerFieldErrors(
                selectStepFieldErrors(fieldErrors, step.FIELD_NAMES)
            )
            if(step.serverFieldErrors.size > 0) {
                step.setStatus('error')
            }
        })
    }
    
    setStepValuesFromValues(values: Record<string, any>) {
        this.steps.forEach(step => {
            const stepValues = Object.entries(values)
                .reduce<Record<string, any>>((acc, [key, value]) => {
                    if (step.FIELD_NAMES.includes(key)) {
                        return {...acc, [key]: value}
                    }
                    return acc
                }, {});
            step.setValues(stepValues);
        })
    }
}
