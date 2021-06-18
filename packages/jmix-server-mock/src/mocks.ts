export const mocks = {
  String: () => 'Banana',
  UUID: () => '123e4567-e89b-12d3-a456-426614174000',
  Long: () => '2',
  BigDecimal: () => '1',
  BigInteger: () => '1',
  Date: () => '2020-03-03',
  Time: () => '',
  DateTime: () => '2020-03-03T23:59:59',
  OffsetTime: () => '23:59:59+04:00',
  OffsetDateTime: () => '2021-01-01T23:59:59+04:00',
  LocalDate: () => '2020-03-03',
  LocalDateTime: () => '2020-03-03T03:03:03',
  LocalTime: () => '23:59:59'
}

export function mockedResolvers(document) {
  return {
    Query: {
      permissions: () => {
        const allTypes = document.definitions.filter(({ kind }) => {
          return kind === "ObjectTypeDefinition"
        });
        const entities = allTypes.map((item: any) => {
          const currentEntity = item.name.value
          return [
            {
              target: `${currentEntity}:create`,
              value: 1
            },
            {
              target: `${currentEntity}:read`,
              value: 1
            },
            {
              target: `${currentEntity}:update`,
              value: 1
            },
            {
              target: `${currentEntity}:delete`,
              value: 1
            },
          ]
        }).flat();

        const entityAttributes = allTypes.map((item: any) => {
          const currentEntity = item.name.value;
          const attributes = item.fields.map((field) => {
            return field.name.value;
          })
          return attributes.map((attr) => {
            return {
              target: `${currentEntity}:${attr}`,
              value: 2
            }
          })
        }).flat();

        return {
          entities,
          entityAttributes
        }
      }
    }
  }
}
