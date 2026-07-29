export type CalculatorResult = {
  value: number;
  format: 'money' | 'percent' | 'unit' | 'number';
  suffix?: string;
};

export function calculateBusinessMetric(
  kind: string | undefined,
  values: Record<string, number>,
): CalculatorResult;

export function shouldUseCautionNote(kind: string | undefined, value: number): boolean;
