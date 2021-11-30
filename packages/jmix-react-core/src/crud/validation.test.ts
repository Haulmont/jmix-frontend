import { BeanValidationRule } from "../app/MetadataProvider";
import { isValidValueForRule } from "./validation";
import dayjs from 'dayjs';

describe('Email', () => {
    const rule: BeanValidationRule = {
        name: 'Email'
    };

    it('handles valid', () => {
        expect(isValidValueForRule('a@a.aa', rule)).toEqual(true);
        expect(isValidValueForRule(null, rule)).toEqual(true);
    })
    it('handles invalid', () => {
        expect(isValidValueForRule('@a.aa', rule)).toEqual(false);
        expect(isValidValueForRule('a@a', rule)).toEqual(false);
        expect(isValidValueForRule('text', rule)).toEqual(false);
    })
})

describe('Email with custom regex', () => {
    const rule: BeanValidationRule = {
        name: 'Email',
        regexp: '^[a-z]+(@test.com)$'
    };

    it('handles valid', () => {
        expect(isValidValueForRule('a@test.com', rule)).toEqual(true);
        expect(isValidValueForRule(null, rule)).toEqual(true);
    })
    it('handles invalid', () => {
        expect(isValidValueForRule('a@a.a', rule)).toEqual(false);
    })
})

describe('Digits', () => {
    const zeroFraction: BeanValidationRule = {
        name: 'Digits',
        integer: 2,
        fraction: 0
    };
    const twoFraction: BeanValidationRule = {
        name: 'Digits',
        integer: 2,
        fraction: 2
    };

    it('handles valid', () => {
        expect(isValidValueForRule(10, zeroFraction)).toEqual(true);
        expect(isValidValueForRule(10.25, twoFraction)).toEqual(true);
        expect(isValidValueForRule(null, zeroFraction)).toEqual(true);
    })
    it('handles invalid', () => {
        expect(isValidValueForRule(10.2, zeroFraction)).toEqual(false);
        expect(isValidValueForRule(10.225, twoFraction)).toEqual(false);
    })
})

describe('Max', () => {
    const rule: BeanValidationRule = {
        name: 'Max',
        value: 99
    };

    it('handles valid', () => {
        expect(isValidValueForRule(99, rule)).toEqual(true);
        expect(isValidValueForRule(5, rule)).toEqual(true);
        expect(isValidValueForRule(0, rule)).toEqual(true);
        expect(isValidValueForRule(-10, rule)).toEqual(true);
        expect(isValidValueForRule(16.5, rule)).toEqual(true);
        expect(isValidValueForRule(null, rule)).toEqual(true);
    })
    it('handles invalid', () => {
        expect(isValidValueForRule(100, rule)).toEqual(false);
    })
})

describe('Min', () => {
    const rule: BeanValidationRule = {
        name: 'Min',
        value: 99
    };

    it('handles valid', () => {
        expect(isValidValueForRule(99, rule)).toEqual(true);
        expect(isValidValueForRule(200, rule)).toEqual(true);
        expect(isValidValueForRule(null, rule)).toEqual(true);
    })
    it('handles invalid', () => {
        expect(isValidValueForRule(50, rule)).toEqual(false);
        expect(isValidValueForRule(-50, rule)).toEqual(false);
        expect(isValidValueForRule(-20.3, rule)).toEqual(false);
    })
})

describe('DecimalMax', () => {
    const rule: BeanValidationRule = {
        name: 'DecimalMax',
        value: '99'
    };

    it('handles valid', () => {
        expect(isValidValueForRule(99, rule)).toEqual(true);
        expect(isValidValueForRule(5, rule)).toEqual(true);
        expect(isValidValueForRule(0, rule)).toEqual(true);
        expect(isValidValueForRule(-10, rule)).toEqual(true);
        expect(isValidValueForRule(16.5, rule)).toEqual(true);
        expect(isValidValueForRule(null, rule)).toEqual(true);
    })
    it('handles invalid', () => {
        expect(isValidValueForRule(100, rule)).toEqual(false);
    })
})

describe('DecimalMin', () => {
    const rule: BeanValidationRule = {
        name: 'DecimalMin',
        value: '99'
    };

    it('handles valid', () => {
        expect(isValidValueForRule(99, rule)).toEqual(true);
        expect(isValidValueForRule(200, rule)).toEqual(true);
        expect(isValidValueForRule(null, rule)).toEqual(true);
    })
    it('handles invalid', () => {
        expect(isValidValueForRule(50, rule)).toEqual(false);
        expect(isValidValueForRule(-50, rule)).toEqual(false);
        expect(isValidValueForRule(-20.3, rule)).toEqual(false);
    })
})

describe('Negative', () => {
    const rule: BeanValidationRule = {
        name: 'Negative'
    };

    it('handles valid', () => {
        expect(isValidValueForRule(-1, rule)).toEqual(true);
        expect(isValidValueForRule(null, rule)).toEqual(true);
    })
    it('handles invalid', () => {
        expect(isValidValueForRule(1, rule)).toEqual(false);
        expect(isValidValueForRule(0, rule)).toEqual(false);
    })
})

describe('NegativeOrZero', () => {
    const rule: BeanValidationRule = {
        name: 'NegativeOrZero'
    };

    it('handles valid', () => {
        expect(isValidValueForRule(-1, rule)).toEqual(true);
        expect(isValidValueForRule(0, rule)).toEqual(true);
        expect(isValidValueForRule(null, rule)).toEqual(true);
    })
    it('handles invalid', () => {
        expect(isValidValueForRule(1, rule)).toEqual(false);
    })
})

describe('Positive', () => {
    const rule: BeanValidationRule = {
        name: 'Positive'
    };

    it('handles valid', () => {
        expect(isValidValueForRule(1, rule)).toEqual(true);
        expect(isValidValueForRule(null, rule)).toEqual(true);
    })
    it('handles invalid', () => {
        expect(isValidValueForRule(-1, rule)).toEqual(false);
        expect(isValidValueForRule(0, rule)).toEqual(false);
    })
})

describe('PositiveOrZero', () => {
    const rule: BeanValidationRule = {
        name: 'PositiveOrZero'
    };

    it('handles valid', () => {
        expect(isValidValueForRule(1, rule)).toEqual(true);
        expect(isValidValueForRule(0, rule)).toEqual(true);
        expect(isValidValueForRule(null, rule)).toEqual(true);
    })
    it('handles invalid', () => {
        expect(isValidValueForRule(-1, rule)).toEqual(false);
    })
})

describe('Past', () => {
    const rule: BeanValidationRule = {
        name: 'Past'
    };

    it('handles DateTime type', () => {
        const datatypes = ['DateTime', 'LocalDateTime', 'OffsetDateTime'];

        datatypes.map(type => {
            expect(isValidValueForRule(dayjs().subtract(10, 'minute'), rule, type)).toEqual(true);
            expect(isValidValueForRule(dayjs().add(10, "minute"), rule, type)).toEqual(false);
        })
    })
    it('handles Date type', () => {
        const datatypes = ['Date', 'LocalDate'];

        datatypes.map(type => {
            expect(isValidValueForRule(dayjs().subtract(10, 'minute'), rule, type)).toEqual(false);
            expect(isValidValueForRule(dayjs(), rule, type)).toEqual(false);
            expect(isValidValueForRule(dayjs().subtract(1, 'year'), rule, type)).toEqual(true);
            expect(isValidValueForRule(dayjs().add(1, 'year'), rule, type)).toEqual(false);
            expect(isValidValueForRule(dayjs().subtract(1, 'day'), rule, type)).toEqual(true);
        })
    })
    it('handles Time type', () => {
        const datatypes = ['Time', 'LocalTime', 'OffsetTime'];

        datatypes.map(type => {
            expect(isValidValueForRule(dayjs().subtract(10, 'minute'), rule, type)).toEqual(true);
            expect(isValidValueForRule(dayjs().subtract(10, 'minute').add(1, 'day'), rule, type)).toEqual(true);
            expect(isValidValueForRule(dayjs().add(10, 'minute'), rule, type)).toEqual(false);
            expect(isValidValueForRule(dayjs().add(10, 'minute').add(1, 'day'), rule, type)).toEqual(false);
        })
    })
})

describe('PastOrPresent', () => {
    const rule: BeanValidationRule = {
        name: 'PastOrPresent'
    };

    it('handles DateTime type', () => {
        const datatypes = ['DateTime', 'LocalDateTime', 'OffsetDateTime'];

        datatypes.map(type => {
            expect(isValidValueForRule(dayjs().subtract(10, 'minute'), rule, type)).toEqual(true);
            expect(isValidValueForRule(dayjs().add(10, "minute"), rule, type)).toEqual(false);
        })
    })
    it('handles Date type', () => {
        const datatypes = ['Date', 'LocalDate'];

        datatypes.map(type => {
            expect(isValidValueForRule(dayjs().subtract(10, 'minute'), rule, type)).toEqual(true);
            expect(isValidValueForRule(dayjs(), rule, type)).toEqual(true);
            expect(isValidValueForRule(dayjs().subtract(1, 'year'), rule, type)).toEqual(true);
            expect(isValidValueForRule(dayjs().add(1, 'year'), rule, type)).toEqual(false);
            expect(isValidValueForRule(dayjs().subtract(1, 'day'), rule, type)).toEqual(true);
        })
    })
    it('handles Time type', () => {
        const datatypes = ['Time', 'LocalTime', 'OffsetTime'];

        datatypes.map(type => {
            expect(isValidValueForRule(dayjs().subtract(10, 'minute'), rule, type)).toEqual(true);
            expect(isValidValueForRule(dayjs().subtract(10, 'minute').add(1, 'day'), rule, type)).toEqual(true);
            expect(isValidValueForRule(dayjs().add(10, 'minute'), rule, type)).toEqual(false);
            expect(isValidValueForRule(dayjs().add(10, 'minute').add(1, 'day'), rule, type)).toEqual(false);
        })
    })
})

describe('Future', () => {
    const rule: BeanValidationRule = {
        name: 'Future'
    };

    it('handles DateTime type', () => {
        const datatypes = ['DateTime', 'LocalDateTime', 'OffsetDateTime'];

        datatypes.map(type => {
            expect(isValidValueForRule(dayjs().subtract(10, 'minute'), rule, type)).toEqual(false);
            expect(isValidValueForRule(dayjs().add(10, "minute"), rule, type)).toEqual(true);
        })
    })
    it('handles Date type', () => {
        const datatypes = ['Date', 'LocalDate'];

        datatypes.map(type => {
            expect(isValidValueForRule(dayjs().add(10, 'minute'), rule, type)).toEqual(false);
            expect(isValidValueForRule(dayjs(), rule, type)).toEqual(false);
            expect(isValidValueForRule(dayjs().subtract(1, 'year'), rule, type)).toEqual(false);
            expect(isValidValueForRule(dayjs().add(1, 'year'), rule, type)).toEqual(true);
            expect(isValidValueForRule(dayjs().add(1, 'day'), rule, type)).toEqual(true);
        })
    })
    it('handles Time type', () => {
        const datatypes = ['Time', 'LocalTime', 'OffsetTime'];

        datatypes.map(type => {
            expect(isValidValueForRule(dayjs().subtract(10, 'minute'), rule, type)).toEqual(false);
            expect(isValidValueForRule(dayjs().subtract(10, 'minute').add(1, 'day'), rule, type)).toEqual(false);
            expect(isValidValueForRule(dayjs().add(10, 'minute'), rule, type)).toEqual(true);
            expect(isValidValueForRule(dayjs().add(10, 'minute').subtract(1, 'day'), rule, type)).toEqual(true);
        })
    })
})

describe('FutureOrPresent', () => {
    const rule: BeanValidationRule = {
        name: 'FutureOrPresent'
    };

    it('handles DateTime type', () => {
        const datatypes = ['DateTime', 'LocalDateTime', 'OffsetDateTime'];

        datatypes.map(type => {
            expect(isValidValueForRule(dayjs().subtract(10, 'minute'), rule, type)).toEqual(false);
            expect(isValidValueForRule(dayjs().add(10, "minute"), rule, type)).toEqual(true);
        })
    })
    it('handles Date type', () => {
        const datatypes = ['Date', 'LocalDate'];

        datatypes.map(type => {
            expect(isValidValueForRule(dayjs().add(10, 'minute'), rule, type)).toEqual(true);
            expect(isValidValueForRule(dayjs(), rule, type)).toEqual(true);
            expect(isValidValueForRule(dayjs().subtract(1, 'year'), rule, type)).toEqual(false);
            expect(isValidValueForRule(dayjs().add(1, 'year'), rule, type)).toEqual(true);
            expect(isValidValueForRule(dayjs().add(1, 'day'), rule, type)).toEqual(true);
        })
    })
    it('handles Time type', () => {
        const datatypes = ['Time', 'LocalTime', 'OffsetTime'];

        datatypes.map(type => {
            expect(isValidValueForRule(dayjs().add(10, 'minute'), rule, type)).toEqual(true);
            expect(isValidValueForRule(dayjs().add(10, 'minute').add(1, 'day'), rule, type)).toEqual(true);
            expect(isValidValueForRule(dayjs().subtract(10, 'minute'), rule, type)).toEqual(false);
            expect(isValidValueForRule(dayjs().subtract(10, 'minute').add(1, 'day'), rule, type)).toEqual(false);
        })
    })
})

describe('Pattern', () => {
    const rule: BeanValidationRule = {
        name: 'Pattern',
        regexp: '[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}'
    };

    it('handles valid', () => {
        expect(isValidValueForRule(null, rule)).toEqual(true);
        expect(isValidValueForRule('b5616aae-477c-11ec-81d3-0242ac130003', rule)).toEqual(true);
    })
    it('handles invalid', () => {
        expect(isValidValueForRule('not a uuid', rule)).toEqual(false);
    })
})

describe('Size', () => {
    const rule: BeanValidationRule = {
        name: 'Size',
        min: 2,
        max: 4
    };

    it('handles valid', () => {
        expect(isValidValueForRule(null, rule)).toEqual(true);
        expect(isValidValueForRule('asd', rule)).toEqual(true);
        expect(isValidValueForRule('as', rule)).toEqual(true);
        expect(isValidValueForRule('asdf', rule)).toEqual(true);
        expect(isValidValueForRule([{id: 1},{id: 2}, {id: 3}], rule)).toEqual(true);
    })
    it('handles invalid', () => {
        expect(isValidValueForRule('a', rule)).toEqual(false);
        expect(isValidValueForRule('asdfs', rule)).toEqual(false);
        expect(isValidValueForRule([{id: 1}], rule)).toEqual(false);
        expect(isValidValueForRule([], rule)).toEqual(false);
    })
})

describe('NotBlank', () => {
    const rule: BeanValidationRule = {
        name: 'NotBlank'
    };
    it('handles valid', () => {
        expect(isValidValueForRule('asd', rule)).toEqual(true);
    })
    it('handles invalid', () => {
        expect(isValidValueForRule('  ', rule)).toEqual(false);
        expect(isValidValueForRule(null, rule)).toEqual(false);
        expect(isValidValueForRule('', rule)).toEqual(false);
    })
})

describe('NotEmpty', () => {
    const rule: BeanValidationRule = {
        name: 'NotEmpty'
    };

    it('handles valid', () => {
        expect(isValidValueForRule('   ', rule)).toEqual(true);
        expect(isValidValueForRule('asd', rule)).toEqual(true);
    })
    it('handles invalid', () => {
        expect(isValidValueForRule(null, rule)).toEqual(false);
        expect(isValidValueForRule('', rule)).toEqual(false);
    })
})

describe('NotNull', () => {
    const rule: BeanValidationRule = {
        name: 'NotNull'
    };

    it('handles valid', () => {
        expect(isValidValueForRule(0, rule)).toEqual(true);
        expect(isValidValueForRule(false, rule)).toEqual(true);
        expect(isValidValueForRule('name', rule)).toEqual(true);
    })
    it('handles invalid', () => {
        expect(isValidValueForRule(null, rule)).toEqual(false);
        expect(isValidValueForRule('', rule)).toEqual(false);
    })
})
