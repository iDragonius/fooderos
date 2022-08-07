import { faker } from '@faker-js/faker'

const range = (len) => {
    const arr = []
    for (let i = 0; i < len; i++) {
        arr.push(i)
    }
    return arr
}

const newPerson = () => {
    return {
        tagId: faker.datatype.number(100),
        tagName: faker.name.firstName(),
        tagType: faker.name.lastName(),
        storeCount: faker.datatype.number(1000),
        status: faker.datatype.boolean(),
    }
}

export function makeData(...lens) {
    const makeDataLevel = (depth = 0) => {
        const len = lens[depth]
        return range(len).map((d) => {
            return {
                ...newPerson(),
                subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
            }
        })
    }

    return makeDataLevel()
}
