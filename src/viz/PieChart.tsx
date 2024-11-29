import { ResponsivePie, PieSvgProps } from '@nivo/pie'

export type PieChartRawData = {
  id: string
  label: string
  value: number
  color?: string
  [x: string]: unknown
}

export interface PieChartProps
  extends Omit<PieSvgProps<PieChartRawData>, 'height' | 'width'> {}

export function PieChart(props: PieChartProps) {
  return <ResponsivePie {...props} />
}