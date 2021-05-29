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